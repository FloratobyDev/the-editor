import classNames from "classnames";

type ProgressRoundProps = {
  currentRound: number;
  totalRounds: number;
};

const ProgressRound = ({ currentRound, totalRounds }: ProgressRoundProps) => {
  return (
    <div
      role="status"
      aria-label="Round progress"
      className="text-center flex gap-x-2"
    >
      {Array.from({ length: totalRounds }, (_, index) => {
        const isCurrentRound = index === currentRound - 1;
        
        const roundClasses = classNames("w-4 h-4 rounded-full", {
          "bg-primary": isCurrentRound,
          "bg-white": !isCurrentRound,
          "border border-gray-300": true,
        });
        return <div key={index} className={roundClasses} />;
      })}
    </div>
  );
};

export default ProgressRound;
