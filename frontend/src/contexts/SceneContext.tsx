/* eslint-disable react-refresh/only-export-components */
import { SCENES } from "@consts";
import { SceneTypes } from "@src/types";
import { createContext, useState, ReactNode } from "react";

interface SceneContextType {
  currentScene: SceneTypes;
  changeScene: (scene: SceneTypes) => void;
  backToMenu: () => void;
}

export const SceneContext = createContext<SceneContextType | undefined>(
  undefined
);

interface SceneProviderProps {
  children: ReactNode;
}

export default function SceneProvider({ children }: SceneProviderProps) {
  const [currentScene, setCurrentScene] = useState<SceneTypes>(SCENES.MARATHON);

  const changeScene = (scene: SceneTypes) => {
    setCurrentScene(scene);
  };

  const backToMenu = () => {
    setCurrentScene(SCENES.GAME_MENU);
  };

  const value = {
    currentScene,
    changeScene,
    backToMenu,
  };

  return (
    <SceneContext.Provider value={value}>
      {children}
    </SceneContext.Provider>
  );
}
