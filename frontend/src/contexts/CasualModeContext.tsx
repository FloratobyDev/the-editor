/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { GameEvent } from "@src/enums/GameEvent";
import { CasualModeContextType } from "@src/types";
import {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useRef,
  useCallback,
} from "react";

export const CasualModeContext = createContext<
  CasualModeContextType | undefined
>(undefined);

interface CasualModeProviderProps {
  children: ReactNode;
}

// const MessageType = Object.freeze({
//   Welcome: "welcome",
//   TimerEnd: "timer-end",
//   TimerUpdate: "timer-update",
//   TimerStopped: "timer-stopped",
//   GameUpdate: "game-update",
//   GameStarted: "game-started",
// });

// Define initial state
const initialState = {
  isRevealed: false,
  gameId: "",
  showHiddenWord: {
    hiddenWord: "",
    show: false,
  },
  heartsLeft: 4,
  maxHearts: 4,
  score: 0,
  wordsFoundInfo: {
    wordsFound: [],
    wordsFoundTotal: 0,
    maxWords: 0,
  },
  timerUpdates: {},
};

// Define reducer
interface State {
  isRevealed: boolean;
  gameId: string;
  showHiddenWord: { hiddenWord: string; show: boolean };
  heartsLeft: number;
  score: number;
  wordsFoundInfo: {
    wordsFound: string[]; // Adjust type based on your data
    wordsFoundTotal: number;
    maxWords: number;
  };
  timerUpdates: Record<string, number>;
}

type Action =
  | { type: "SET_GAME_ID"; payload: string }
  | { type: "SET_IS_REVEALED"; payload: boolean }
  | {
      type: "SET_SHOW_HIDDEN_WORD";
      payload: { hiddenWord: string; show: boolean };
    }
  | { type: "SET_HEARTS_LEFT"; payload: number }
  | { type: "SET_SCORE"; payload: number }
  | { type: "UPDATE_WORDS_FOUND_INFO"; payload: State["wordsFoundInfo"] }
  | { type: "UPDATE_TIMER"; payload: { id: string; remainingTime: number } }
  | { type: "REMOVE_TIMER"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_GAME_ID":
      return { ...state, gameId: action.payload };
    case "SET_IS_REVEALED":
      return { ...state, isRevealed: action.payload };
    case "SET_SHOW_HIDDEN_WORD":
      return { ...state, showHiddenWord: action.payload };
    case "SET_HEARTS_LEFT":
      return { ...state, heartsLeft: action.payload };
    case "SET_SCORE":
      return { ...state, score: action.payload };
    case "UPDATE_WORDS_FOUND_INFO":
      return { ...state, wordsFoundInfo: action.payload };
    case "UPDATE_TIMER":
      return {
        ...state,
        timerUpdates: {
          ...state.timerUpdates,
          [action.payload.id]: action.payload.remainingTime,
        },
      };
    case "REMOVE_TIMER": {
      const { [action.payload]: _, ...remaining } = state.timerUpdates; // Properly scoped
      return { ...state, timerUpdates: remaining };
    }
    default:
      return state;
  }
}

export default function CasualModeProvider({
  children,
}: CasualModeProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const websocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8080");
    websocketRef.current = websocket;

    websocket.onopen = () => {
      sendEvent(GameEvent.GAME_START, {});
    };

    websocket.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);

      console.log("data", type, data);

      switch (type) {
        case GameEvent.GAME_START: {
          const { heartsLeft, score, wordsFound, totalWordsToGuess, gameId } =
            data.game;
          dispatch({ type: "SET_GAME_ID", payload: gameId });
          dispatch({ type: "SET_HEARTS_LEFT", payload: heartsLeft });
          dispatch({ type: "SET_SCORE", payload: score });
          dispatch({
            type: "UPDATE_WORDS_FOUND_INFO",
            payload: {
              wordsFound: wordsFound,
              wordsFoundTotal: wordsFound.length,
              maxWords: totalWordsToGuess,
            },
          });
          break;
        }
        case GameEvent.GAME_UPDATE: {
          const { heartsLeft, score, wordsFound, totalWordsToGuess } = data;
          dispatch({ type: "SET_HEARTS_LEFT", payload: heartsLeft });
          dispatch({ type: "SET_SCORE", payload: score });
          dispatch({
            type: "UPDATE_WORDS_FOUND_INFO",
            payload: {
              wordsFound: wordsFound,
              wordsFoundTotal: wordsFound.length,
              maxWords: totalWordsToGuess,
            },
          });
          break;
        }
        default: {
          console.log("Unknown event type.");
          break;
        }
      }
    };

    websocket.onclose = () => {
      console.log("Disconnected from server");
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const sendEvent = useCallback(
    (eventType: string, payload: object) => {
      websocketRef.current?.send(
        JSON.stringify({
          type: eventType,
          payload: {
            gameId: state.gameId,
            ...payload,
          },
        })
      );
    },
    [state.gameId]
  );

  const value: CasualModeContextType = {
    ...state,
    sendEvent,
  };

  return (
    <CasualModeContext.Provider value={value}>
      {children}
    </CasualModeContext.Provider>
  );
}
