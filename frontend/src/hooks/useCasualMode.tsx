import { CasualModeContext } from "@contexts/CasualModeContext";
import { useContext } from "react";

export function useCasualMode() {
  const context = useContext(CasualModeContext);
  if (context === undefined) {
    throw new Error("useCasualMode must be used within a CasualModeProvider");
  }
  return context;
}
