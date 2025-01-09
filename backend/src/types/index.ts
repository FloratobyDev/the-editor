export interface Timer {
  id: string;
  duration: number;
  remaining: number;
  isRunning: boolean;
  clientCount: number;
  disconnectedAt?: number;
}

export interface TimerInput {
  duration: number;
  id?: string;
}

export interface WSMessage {
  type: string;
  payload?: any;
}

export interface TimerUpdates {
  [key: string]: number;
}

export interface TimerStatus {
  id: string;
  remainingTime: number;
  isRunning: boolean;
}

export interface GameProgressUpdates {
  heartsLeft?: number;
  wordsFound?: string[];
  totalWordsToGuess?: number;
  sentenceFound?: number[];
  score?: number;
}

export interface GameError {
  sentence_index: number;
  error: string;
  type: string;
  explanation: string;
  correction: string;
}

export interface GameState {
  gameId: string;
  heartsLeft: number;
  wordsFound: string[];
  sentenceFound: number[];
  powerups: {
    powerOne: number;
    powerTwo: number;
  };
  totalWordsToGuess: number;
  score: number;
  status: TimerStatus;
}
