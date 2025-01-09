import LogoutIcon from "@icons/LogoutIcon";
import SettingsIcon from "@icons/SettingsIcon";
import VolumeIcon from "@icons/VolumeIcon";
import Modal from "./Modal";
import { useState } from "react";
import SceneButton from "./SceneButton";
import { SceneTypes } from "@src/types";
import { SCENES } from "@consts";

type Props = {
  changeScene: (scene: SceneTypes) => void;
};

const GameNavbar = ({ changeScene }: Props) => {
  const [isLeaveGame, setIsLeaveGame] = useState(false);

  return (
    <>
      <Modal isOpen={isLeaveGame}>
        <div className="w-[40%] p-8 md overflow-y-auto bg-white border border-[#F0F0F0] rounded-2xl box-border">
          <p className=" text-lg font-medium text-primary mb-8">
            Are you sure you want to leave?
          </p>
          <div className="flex gap-x-2">
            <SceneButton label="Cancel" onClick={() => setIsLeaveGame(false)} />
            <SceneButton
              label="Leave"
              onClick={() => {
                setIsLeaveGame(false);
                changeScene(SCENES.GAME_MENU);
              }}
            />
          </div>
        </div>
      </Modal>
      <nav
        className="p-6 flex items-center justify-between"
        aria-label="Game navigation"
      >
        <p className="text-sub-lg font-semibold text-primary">The Editor</p>
        <div className="flex items-center justify-center gap-x-2">
          <button
            aria-label="Return to previous page"
            className="p-2 text-white rounded-2xl hover:scale-110 transition-all"
          >
            <VolumeIcon />
          </button>
          <button
            aria-label="Return to previous page"
            className="p-2 text-white rounded-2xl hover:scale-110 transition-all"
          >
            <SettingsIcon />
          </button>
          <button
            onClick={() => setIsLeaveGame(true)}
            aria-label="Return to previous page"
            className="p-2 text-white rounded-2xl hover:scale-110 transition-all"
          >
            <LogoutIcon />
          </button>
        </div>
      </nav>
    </>
  );
};

export default GameNavbar;
