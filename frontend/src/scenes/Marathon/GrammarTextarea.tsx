import anime from "animejs";
import classNames from "classnames";
import { useState, useMemo, MouseEvent, KeyboardEvent } from "react";

type Props = {
  onWordClick: (word: string) => void;
};

const GrammarTextarea = ({ onWordClick }: Props) => {
  const rawParagraph =
    "The castle stood imposingly atop the hill, its towers shillouetted against the darkening sky. The journey there had been long and full of obstacals, yet Maria felt a surge of deter as she aproached the massive iron gate. She could hear the distant howling of wolves in the forrest, and the rustling of leaves underfoot as the wind began to pick up. \n With trembling hands, she reached out and pushed the gate—it groaned in protest, the sound echoing into the emptyness within. She steped through, her eyes widening as they adjusted to the dim light inside the courtyard.";

  const [correctWordsClicked, setCorrectWordsClicked] = useState<
    { word: string; index: number; chunkIndex: number }[]
  >([]);
  const [incorrectWordsClicked, setIncorrectWordsClicked] = useState<
    { word: string; index: number; chunkIndex: number }[]
  >([]);

  const typos: { [key: string]: string } = useMemo(() => {
    return {
      shillouetted: "silhouetted",
      obstacals: "obstacles",
      aproached: "approached",
      forrest: "forest",
      emptyness: "emptiness",
      steped: "stepped",
    };
  }, []);

  function onSpanClick(
    e: MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>,
    chunkIndex: number
  ) {
    const target = e.target as HTMLElement;
    const wordText = target.textContent || "";
    const index = Number(target.dataset.index);

    // Avoid double-clicking the same word
    const alreadyClicked =
      correctWordsClicked.some(
        (item) => item.index === index && item.chunkIndex === chunkIndex
      ) ||
      incorrectWordsClicked.some(
        (item) => item.index === index && item.chunkIndex === chunkIndex
      );

    if (alreadyClicked) return;

    // If the clicked word is one of our known typos...
    if (wordText in typos) {
      setCorrectWordsClicked((prev) => [
        ...prev,
        { word: wordText, index, chunkIndex },
      ]);
      onWordClick(wordText); // notify parent

      // Animate correct word
      anime({
        targets: e.target,
        scale: [1, 1.2, 1],
        zIndex: 10,
        duration: 300,
        easing: "easeOutBack",
        onComplete: () => {
          anime({
            targets: e.target,
            zIndex: 0,
          });
        },
      });
    } else {
      setIncorrectWordsClicked((prev) => [
        ...prev,
        { word: wordText, index, chunkIndex },
      ]);

      anime({
        targets: e.target,
        scale: [1, 0.9, 1],
        duration: 300,
        easing: "easeOutBack",
      });
    }
  }

  return (
    <div className="flex-1 w-full p-8 md:overflow-y-auto bg-white border border-[#F0F0F0] rounded-md box-border">
      <label htmlFor="typing-input" className="sr-only">
        Type the text below
      </label>
      <div className="whitespace-pre-wrap break-words text-lg">
        {rawParagraph.split("\n").map((chunk, chunkIndex) => (
          <p key={chunkIndex} className="mb-4">
            {chunk.match(/[^.!?]+[.!?]+(?:\s+|$)/g)?.map((word, index) => {
              const isPunctuation = /^[.,!?;:()]+$/.test(word);
              
              const isCorrectWordClicked = correctWordsClicked.some(
                (item) => item.index === index && item.chunkIndex === chunkIndex
              );
              const isIncorrectWordClicked = incorrectWordsClicked.some(
                (item) => item.index === index && item.chunkIndex === chunkIndex
              );

              const spanClasses = classNames(
                "py-1 font-medium text-lg inline leading-none origin-center cursor-pointer rounded-lg",
                {
                  // "text-green-300":
                    // (isRevealed && word in typos) ||
                    // (showHiddenWord.show && word === showHiddenWord.hiddenWord),
                  "text-red-300": isIncorrectWordClicked,
                  "text-green-400": isCorrectWordClicked,
                  "text-primary":
                    !isCorrectWordClicked &&
                    !isIncorrectWordClicked,
                    // !(isRevealed && word in typos),
                },
                `span-word-${index}`
              );

              return (
                <span
                  tabIndex={isPunctuation ? -1 : 0}
                  role={isPunctuation ? undefined : "button"}
                  key={`${chunkIndex}-${index}`}
                  data-index={index}
                  className={spanClasses}
                  onMouseEnter={(event: MouseEvent<HTMLSpanElement>) => {
                    anime({
                      targets: event.target,
                      keyframes: [
                        { translateX: -2.5, rotate: -2.5, scale: 1.1, color: '#77D385', duration: 100 },
                        { translateX: 2.5, rotate: 2.5, color: '#77D385', duration: 100 },
                        { translateX: 0, rotate: 0, color: '#77D385', duration: 100 },
                      ],
                      easing: 'easeInOutSine',
                    });
                  }}
                  onMouseLeave={(event: MouseEvent<HTMLSpanElement>) => {
                    if (isPunctuation) return;

                    anime({
                      targets: event.target,
                      translateX: 0,
                      scale: 1,
                      rotate: 0,
                      color: "#5B5B5B", // Reset color to black
                      easing: 'easeOutElastic(1, 0.5)', // Smooth return to original state
                      duration: 500,
                    });
                  }}
                  onClick={(e) => {
                    if (!isPunctuation) {
                      onSpanClick(e, chunkIndex);
                    }
                  }}
                  onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) => {
                    if (e.key === "Enter" && !isPunctuation) {
                      onSpanClick(e, chunkIndex);
                    }
                  }}
                >
                  {/* Insert a space before the word if it's not punctuation and not the very first index */}
                  {!isPunctuation && index !== 0 ? " " : ""}
                  {word}
                </span>
              );
            })}
          </p>
        ))}
      </div>
    </div>
  );
};

export default GrammarTextarea;
