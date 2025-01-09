import CloseIcon from "@icons/CloseIcon";
import anime from "animejs";
import classNames from "classnames";
import { useRef, useEffect } from "react";

type MistakesProps = {
  currentMistakes: number; // Number of mistakes the user has made
  totalMistakes: number; // Total number of mistakes available
};

const Mistakes: React.FC<MistakesProps> = ({
  currentMistakes,
  totalMistakes,
}) => {
  const mistakeRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (currentMistakes > 0) {
      const lastMistakeIndex = currentMistakes - 1;

      // Animate the last updated mistake box
      anime({
        targets: mistakeRefs.current[lastMistakeIndex],
        scale: [0.8, 1],
        // backgroundColor: ["#fff", "#fee2e2"], // Light red
        easing: "easeOutElastic(1, 0.5)",
        duration: 600,
      });
    }
  }, [currentMistakes]);

  return (
    <div className="flex items-center justify-center gap-x-1">
      {Array.from({ length: totalMistakes }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) mistakeRefs.current[index] = el;
          }}
          className={classNames(
            "w-12 h-12 rounded-lg border flex justify-center items-center bg-white",
            {
              "border-primary-red text-primary-red": index < currentMistakes, // Red for mistakes made
              "border-gray-bg": index >= currentMistakes, // Gray for remaining mistakes
            }
          )}
        >
          <CloseIcon color={index < currentMistakes ? "#D37777" : "#ECECEC"} />
          {/* <span className="text-xl font-bold">X</span> */}
        </div>
      ))}
    </div>
  );
};

export default Mistakes;
