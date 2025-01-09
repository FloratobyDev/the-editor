import React, { useState, useEffect, useRef } from "react";
import anime from "animejs";
import classNames from "classnames";
import Small from "./typography/Small";

type TabsOption<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  options: TabsOption<T>[];
  onChange: (value: T) => void;
  direction: "horizontal" | "vertical";
  defaultValue?: T;
};

// Custom hook to create and manage refs for each segment
function useRefs<T>(options: TabsOption<T>[]) {
  const refs = useRef<Array<React.RefObject<HTMLButtonElement>>>([]);
  refs.current = options.map(
    (_option, i) => refs.current[i] ?? React.createRef()
  );
  return refs.current;
}

const Tabs = <T extends string | number>({
  options,
  onChange,
  direction,
  defaultValue,
}: Props<T>) => {
  const [selected, setSelected] = useState<T>(defaultValue || options[0].value);
  const [isInitial, setInitial] = useState(true);
  const handleRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRefs(options);

  useEffect(() => {
    const selectedIndex = options.findIndex((opt) => opt.value === selected);
    const selectedElement = segmentRefs[selectedIndex].current;
    if (selectedElement) {
      const { width, height, x, y } = selectedElement.getBoundingClientRect();
      const parentNode = selectedElement.parentNode as HTMLElement;

      const parentX = parentNode.getBoundingClientRect().x;
      const parentY = parentNode.getBoundingClientRect().y;

      if (isInitial) {
        anime.set(handleRef.current, {
          translateX: direction === "horizontal" ? x - parentX : 0,
          translateY: direction === "vertical" ? y - parentY : 0,
          width: direction === "horizontal" ? width : "100%",
          height: direction === "vertical" ? height : "100%",
        });
        setInitial(false);
      } else {
        anime({
          targets: handleRef.current,
          translateX: direction === "horizontal" ? x - parentX : 0,
          translateY: direction === "vertical" ? y - parentY : 0,
          width: direction === "horizontal" ? width : "100%",
          height: direction === "vertical" ? height : "100%",
          duration: 250,
          easing: "easeInOutExpo",
        });
      }
    }
  }, [selected, segmentRefs, options, direction, isInitial]);

  const containerClasses = classNames(
    "inline-block p-1 bg-gray-bg shadow-sm border border-border-gray border-opacity-[30%]",
    {
      "rounded-3xl": direction === "vertical",
      "rounded-md": direction === "horizontal",
    }
  );

  const parentClasses = classNames("relative flex", {
    "flex-row": direction === "horizontal",
    "flex-col": direction === "vertical",
  });

  return (
    <div className={containerClasses}>
      <div className={parentClasses}>
        <div
          ref={handleRef}
          className="absolute top-0 left-0 bg-white rounded-md h-full z-10"
        />
        {options.map((option: TabsOption<T>, index: number) => {
          const buttonClasses = classNames(
            "relative z-20 px-2 py-3 rounded-md focus:outline-none transition-colors duration-300",
            {
              "shadow-shadow-xs-mini": selected === option.value,
              "hover:bg-gray-200": selected !== option.value,
            }
          );

          return (
            <button
              key={index}
              ref={segmentRefs[index]}
              className={buttonClasses}
              onClick={() => {
                setSelected(option.value);
                onChange(option.value);
              }}
            >
              <Small
                textVariant={
                  selected === option.value ? "primary" : "secondary"
                }
              >
                {option.label}
              </Small>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
