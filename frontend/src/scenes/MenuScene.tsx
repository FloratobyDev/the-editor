import SceneButton from "@components/SceneButton";
import { H1 } from "@components/typography/H1";
import { SCENES } from "@consts";
import { useScene } from "@hooks/useScene";


const MenuScene = () => {
  const { changeScene } = useScene();
  const buttonLists = [
    { id: SCENES.GAME_MODE, label: "Play" },
    { id: SCENES.LEADERBOARD, label: "Daily Leaderboard" },
    { id: SCENES.DICTIONARY, label: "Dictionary" },
    { id: SCENES.SETTINGS, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col gap-y-8 items-center justify-center h-full">
      <H1>The Editor</H1>
      <div className="flex items-center justify-center flex-col w-72 gap-y-5">
        {buttonLists.map((button, index) => {
          console.log("button", button);
          return (
            <SceneButton
              key={index}
              label={button.label}
              onClick={() => changeScene(button.id)}
            />
          );
        })}
      </div>
      <p className="absolute bottom-8 text-[#d2d2d2] text-xs">
        Made with &lt;3 by Michael Mushrush
      </p>
    </div>
  );
};

export default MenuScene;
