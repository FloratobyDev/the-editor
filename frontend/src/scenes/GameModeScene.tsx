import Badge from "@components/Badge";
import Navbar from "@components/Navbar";
import NavigationLink from "@components/NavigationLink";
import ButtonText from "@components/typography/ButtonText";
import SubParagraph from "@components/typography/SubParagraph";
import { SCENES } from "@consts";
import { useScene } from "@hooks/useScene";
import CoffeeIcon from "@icons/CoffeeIcon";
import LightningIcon from "@icons/LightningIcon";
import ListIcon from "@icons/ListIcon";
import { useMemo } from "react";

const GameModeScene = () => {
  const { changeScene } = useScene();

  const modes = useMemo(
    () => [
      {
        id: SCENES.MARATHON,
        label: "Casual Mode",
        description:
          "It was a warm, sunny day, and I decieded to take a stroll through the park. I packed a sandwitch and a bottle of juice, and set off. The flowers were in full bloom, and the birds were singing.",
        icon: <CoffeeIcon />,
        types: [],
      },
      {
        id: SCENES.RELAY,
        label: "Rapid Mode",
        description:
          "It was a warm, sunny day, and I decieded to take a stroll through the park. I packed a sandwitch and a bottle of juice, and set off.",
        icon: <LightningIcon />,
        types: ["timed", "ranked"],
      },
      {
        id: SCENES.DAILY,
        label: "Daily Rank",
        description:
          "It was a warm, sunny day, and I decieded to take a stroll through the park. I packed a sandwitch and a bottle of juice, and set off.",
        icon: <ListIcon />,
        types: ["ranked"],
      },
    ],
    []
  );

  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="flex justify-center flex-col gap-x-4 gap-y-6 h-full w-[1280px] mx-auto">
        <NavigationLink label={"Main Menu"} scene={SCENES.GAME_MENU} />
        <div className="grid grid-cols-3 gap-x-4">
          {modes.map((mode) => {
            return (
              <section
                role="button"
                key={mode.id}
                onClick={() => changeScene(mode.id)}
                className="shadow-shadow-button p-6 text-lg font-bold text-primary bg-white rounded-lg hover:shadow-shadow-hover transition-shadow duration-300 ease-in-out cursor-pointer flex flex-col gap-y-6 h-[352px]"
              >
                <div className="flex items-center justify-between">
                  {mode.icon}
                  <div className="flex items-center justify-center gap-x-2">
                    {mode.types.map((type) => (
                      <Badge label={type} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <ButtonText size="lg">{mode.label}</ButtonText>
                  <SubParagraph>{mode.description}</SubParagraph>
                </div>
                {/* <p className="text-lg font-medium pt-2">{mode.description}</p> */}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameModeScene;
