import { Suspense, lazy } from "react";
import { SCENES } from "@consts";
import { useScene } from "@hooks/useScene";
import SceneProvider from "@contexts/SceneContext";
import Transition from "@scenes/Transition";
import CasualModeProvider from "@contexts/CasualModeContext";
const MenuScene = lazy(() => import("@scenes/MenuScene"));
const GameModeScene = lazy(() => import("@scenes/GameModeScene"));
const GameEndScene = lazy(() => import("@scenes/GameEndScene"));
const GameScene = lazy(() => import("@scenes/GameScene"));
const LeaderboardScene = lazy(() => import("@scenes/LeaderboardScene"));
const DictionaryScene = lazy(() => import("@scenes/DictionaryScene"));
const MarathonScene = lazy(() => import("@scenes/Marathon"));
const RelayScene = lazy(() => import("@scenes/Relay"));

function SceneRenderer() {
  const { currentScene } = useScene();

  const renderScene = () => {
    switch (currentScene) {
      case SCENES.GAME_MENU:
        return <MenuScene />;
      case SCENES.GAME_MODE:
        return <GameModeScene />;
      case SCENES.MARATHON:
        return (
          <CasualModeProvider>
            <MarathonScene />
          </CasualModeProvider>
        );
      case SCENES.RELAY:
        return <RelayScene />;
      case SCENES.GAME_END:
        return <GameEndScene />;
      case SCENES.GAME:
        return <GameScene />;
      case SCENES.LEADERBOARD:
        return <LeaderboardScene />;
      case SCENES.DICTIONARY:
        return <DictionaryScene />;
      default:
        return <div>Error: Unknown Scene</div>;
    }
  };

  return renderScene();
}

const App = () => {
  return (
    <main className="h-screen w-full relative">
      <div className="absolute inset-0 bg-[url('./assets/arches.png')] bg-repeat -z-10" />
      <SceneProvider>
        <Suspense fallback={<Transition />}>
          <SceneRenderer />
        </Suspense>
      </SceneProvider>
    </main>
  );
};

export default App;
