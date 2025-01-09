import { SceneContext } from "@contexts/SceneContext";
import { useContext } from "react";

export function useScene() {
  const context = useContext(SceneContext);
  if (context === undefined) {
    throw new Error("useScene must be used within a SceneProvider");
  }
  return context;
}
