import { nanoid } from "nanoid";
import { GameEventType, GameEvent } from "../consts";
import { GameProgressUpdates, TimerStatus } from "../types";
import { RedisRepository } from "./RedisRepository";
import { WebSocket } from "ws";

class GameWebSocketHandler {
  private redisRepo: RedisRepository;

  constructor() {
    this.redisRepo = RedisRepository.getInstance();
  }

  private async updateGameProgress(id: string, updates: GameProgressUpdates) {
    const gameProgressKey = `game:${id}:progress`;
    const data = await this.redisRepo.get(gameProgressKey);
    if (!data) throw new Error(`Game progress not found for game ID: ${id}`);

    const progress = JSON.parse(data);
    const updatedProgress = { ...progress, ...updates };
    await this.redisRepo.set(gameProgressKey, JSON.stringify(updatedProgress));
  }

  private callEvent(ws: WebSocket, event: GameEventType, data?: any) {
    const message = JSON.stringify({ type: event, data });
    ws.send(message);
  }

  async checkWord(ws: WebSocket, enteredWord: string, gameId: string) {
    const gamePrivateWordsKey = `game:${gameId}:private:words`;
    const gamePublicKey = `game:${gameId}:public`;

    try {
      // Get both private words and public game data
      const [privateWordsData, publicGameData] = await Promise.all([
        this.redisRepo.get(gamePrivateWordsKey),
        this.redisRepo.get(gamePublicKey),
      ]);

      if (!privateWordsData || !publicGameData) {
        throw new Error("Game data not found");
      }

      const privateWords = JSON.parse(privateWordsData);
      const gameState = JSON.parse(publicGameData);
      const isCorrect = privateWords.includes(enteredWord);

      if (isCorrect && !gameState.wordsFound.includes(enteredWord)) {
        // Update the game state
        const updatedGameState = {
          ...gameState,
          wordsFound: [...gameState.wordsFound, enteredWord],
          score: gameState.score + 100,
        };

        // Save the updated game state
        await this.redisRepo.set(
          gamePublicKey,
          JSON.stringify(updatedGameState)
        );

        // Update game progress
        await this.updateGameProgress(gameId, {
          wordsFound: updatedGameState.wordsFound,
          totalWordsToGuess: privateWords.length,
          score: updatedGameState.score,
        });

        this.callEvent(ws, GameEvent.GAME_UPDATE, updatedGameState);
      } else {
        // If word is incorrect or already found
        if (gameState.heartsLeft > 0) {
          const updatedGameState = {
            ...gameState,
            heartsLeft: gameState.heartsLeft - 1,
          };

          // Save the updated game state
          await this.redisRepo.set(
            gamePublicKey,
            JSON.stringify(updatedGameState)
          );

          this.callEvent(ws, GameEvent.GAME_UPDATE, updatedGameState);
        }
      }
    } catch (error) {
      console.error("Error checking word:", error);
      // this.callEvent(ws, GameEvent.GAME_ERROR, {
      //   success: false,
      //   message: "Error checking word"
      // });
    }
  }

  async checkGrammar(ws: WebSocket, sentenceIndex: number, gameId: string) {
    const gamePrivateErrorsKey = `game:${gameId}:private:sentenceErrors`;
    const gameProgressKey = `game:${gameId}:progress`;

    try {
      const [privateErrorsData, gameProgressData] = await Promise.all([
        this.redisRepo.get(gamePrivateErrorsKey),
        this.redisRepo.get(gameProgressKey),
      ]);

      if (!privateErrorsData) {
        throw new Error("Grammar errors data not found");
      }

      const errorsData = JSON.parse(privateErrorsData);
      const gameProgress = gameProgressData
        ? JSON.parse(gameProgressData)
        : null;
      const sentenceErrors = errorsData[0].errors.filter(
        (error: any) => error.sentence_index === sentenceIndex
      );

      if (sentenceErrors.length > 0) {
        const currentScore = gameProgress?.score || 0;
        const newScore = currentScore + 150;

        await this.updateGameProgress(gameId, {
          score: newScore,
          sentenceFound: [
            ...(gameProgress?.sentenceFound || []),
            sentenceIndex,
          ],
        });

        this.callEvent(ws, GameEvent.GRAMMAR_CHECK, {
          sentenceIndex,
          errors: sentenceErrors,
          success: true,
          score: newScore,
        });
      } else {
        this.callEvent(ws, GameEvent.GRAMMAR_CHECK, {
          sentenceIndex,
          success: false,
          message: "No grammar errors found in this sentence",
        });
      }
    } catch (error) {
      console.error("Error checking grammar:", error);
      this.callEvent(ws, GameEvent.GRAMMAR_CHECK, {
        success: false,
        message: "Error checking grammar",
      });
    }
  }

  async gameStart(ws: WebSocket) {
    const id = nanoid();
    const gamePublicKey = `game:${id}:public`;
    const gamePrivateWordsKey = `game:${id}:private:words`;
    const gamePrivateErrorsKey = `game:${id}:private:sentenceErrors`;
    const gameProgressKey = `game:${id}:progress`; // Add this line
    const oneHourInSeconds = 3600;

    try {
      const existingPublicGame = await this.redisRepo.get(gamePublicKey);

      if (existingPublicGame) {
        const game = JSON.parse(existingPublicGame);
        this.callEvent(ws, GameEvent.GAME_START, { game });
        return;
      }

      const paragraph =
        "The castle stood imposingly atop the hill, its towers shillouetted against the darkening sky. The journey there had been long and full of obstacals, yet Maria felt a surge of deter as she aproached the massive iron gate. She could hear the distant howling of wolves in the forrest, and the rustling of leaves underfoot as the wind began to pick up. \n With trembling hands, she reached out and pushed the gate—it groaned in protest, the sound echoing into the emptyness within. She steped through, her eyes widening as they adjusted to the dim light inside the courtyard.";

      const privateWordsData = [
        "shillouetted",
        "obstacals",
        "aproached",
        "forrest",
        "emptyness",
        "steped",
      ];
      const publicGameData = {
        gameId: id,
        heartsLeft: 4,
        maxHearts: 4,
        wordsFound: [],
        sentenceFound: [],
        powerups: {
          powerOne: 1,
          powerTwo: 1,
        },
        totalWordsToGuess: privateWordsData.length,
        score: 0,
      };

      // Add initial game progress data
      const initialGameProgress = {
        wordsFound: [],
        totalWordsToGuess: privateWordsData.length,
        score: 0,
        sentenceFound: [],
      };

      const privateErrorsData = [
        {
          original_paragraph: paragraph,
          errors: [
            {
              sentence_index: 1,
              error: "shillouetted",
              type: "spelling",
              explanation: "Incorrect spelling",
              correction: "silhouetted",
            },
          ],
        },
      ];

      console.log("Starting new game session.");
      await Promise.all([
        this.redisRepo.setEx(
          gamePublicKey,
          oneHourInSeconds,
          JSON.stringify(publicGameData)
        ),
        this.redisRepo.setEx(
          gamePrivateWordsKey,
          oneHourInSeconds,
          JSON.stringify(privateWordsData)
        ),
        this.redisRepo.setEx(
          gamePrivateErrorsKey,
          oneHourInSeconds,
          JSON.stringify(privateErrorsData)
        ),
        this.redisRepo.setEx(
          gameProgressKey,
          oneHourInSeconds,
          JSON.stringify(initialGameProgress)
        ), // Add this line
      ]);

      console.log("Sending initial data.");
      this.callEvent(ws, GameEvent.GAME_START, { game: publicGameData });
    } catch (error) {
      console.error("Error managing game session:", error);
    }
  }
}

export { GameWebSocketHandler };
