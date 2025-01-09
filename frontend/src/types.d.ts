import { SCENES } from './scenes';

export type SceneTypes = keyof typeof SCENES;

export type DetectionMode = typeof DETECTION_MODES[keyof typeof DETECTION_MODES];

export type CasualModeContextType = {
  isRevealed: boolean;
  showHiddenWord: { hiddenWord: string; show: boolean };
  heartsLeft: number;
  score: number;
  wordsFoundInfo: {
    wordsFound: string[];
    wordsFoundTotal: number;
    maxWords: number;
  };
  timerUpdates: Record<string, number>;
  sendEvent: (eventType: string, payload: object) => void;
}

export type SceneContextType = {
  currentScene: SceneTypes;
  changeScene: (scene: SceneTypes) => void;
  backToMenu: () => void;
}