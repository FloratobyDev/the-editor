/* eslint-disable @typescript-eslint/no-unused-vars */
import GameNavbar from "@components/GameNavbar";
import ControlButtons from "./ControlButtons";
import Stats from "./Stats";
import ProgressRound from "./ProgressRound";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import { useScene } from "@hooks/useScene";
import GrammarTextarea from "./GrammarTextarea";
import SpellingTextarea from "./SpellingTextarea";
import { DETECTION_MODES } from "@consts";
import { DetectionMode } from "@src/types";
import { useCasualMode } from "@hooks/useCasualMode";

const Marathon = () => {
  const { changeScene } = useScene();
  const { score, heartsLeft, wordsFoundInfo, sendEvent, timerUpdates } =
    useCasualMode();

  const progressBarValue = ((timerUpdates["testTimer"] || 0) / 60) * 100;
  const [currentTab, setCurrentTab] = useState<DetectionMode>(
    DETECTION_MODES.SPELLING
  );

  return (
      <main className="flex flex-col h-full">
        <GameNavbar changeScene={changeScene} />
        <section
          className="flex items-center justify-center w-full h-full"
          aria-label="Marathon game section"
        >
          <article
            className="flex flex-col justify-center items-center gap-y-3 h-[85%] w-[50%] p-4 rounded-2xl"
            role="region"
            aria-label="Game interface"
          >
            <header className="flex justify-between items-center w-full">
              <ControlButtons setCurrentTab={setCurrentTab} />
              <Stats
                heartsLeft={heartsLeft}
                score={score}
                wordsLeft={
                  wordsFoundInfo.wordsFoundTotal
                }
                totalWords={wordsFoundInfo.maxWords}
              />
            </header>
            <ProgressBar progress={progressBarValue} />
            {currentTab === DETECTION_MODES.SPELLING && (
              <SpellingTextarea
                onWordClick={(word: string) => sendEvent("testTimer", { word })}
              />
            )}
            {currentTab === DETECTION_MODES.GRAMMAR && (
              <GrammarTextarea
                onWordClick={(word: string) => sendEvent("testTimer", { word })}
              />
            )}

            <footer>
              <ProgressRound currentRound={1} totalRounds={3} />
            </footer>
          </article>
        </section>
      </main>
  );
};

export default Marathon;
