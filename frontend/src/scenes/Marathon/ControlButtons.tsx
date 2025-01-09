import Divider from "@components/Divider";
import Tabs from "@components/Tabs";
import { DETECTION_MODES } from "@consts";
import LightIcon from "@icons/LightIcon";
import MushroomIcon from "@icons/MushroomIcon";

type Props = {
  setCurrentTab: (value: string) => void;
};

const ControlButtons = ({ setCurrentTab }: Props) => {
  const options = [
    { label: "Spelling", value: DETECTION_MODES.SPELLING },
    { label: "Grammar", value: DETECTION_MODES.GRAMMAR },
  ];
  return (
    <div
      role="toolbar"
      aria-label="Game Controls"
      className="flex items-center gap-x-4 gap-y-2"
    >
      <div>
        <Tabs
          options={options}
          onChange={(value) => {
            setCurrentTab(value);
          }}
          direction={"horizontal"}
        />
      </div>
      <div className="h-10">
        <Divider orientation="vertical" />
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <button
          onClick={() => {
            // setIsRevealed(true);
          }}
          aria-label="Start game"
          className="h-12 w-12 px-6 py-3 border border-[#F0F0F0] border-opacity-30 shadow-shadow-mini text-white rounded-md bg-white hover:shadow-shadow-hover hover:scale-105 flex items-center justify-center"
        >
          <div>
            <MushroomIcon />
          </div>
        </button>
        <button
          onClick={() => {
            // setShowHiddenWord({ hiddenWord: "shillouetted", show: true });
          }}
          aria-label="Reset game"
          className="h-12 w-12 px-6 py-3 border border-[#F0F0F0] border-opacity-30 shadow-shadow-mini text-white rounded-md bg-white hover:shadow-shadow-hover hover:scale-105 flex items-center justify-center"
        >
          <div>
            <LightIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ControlButtons;
