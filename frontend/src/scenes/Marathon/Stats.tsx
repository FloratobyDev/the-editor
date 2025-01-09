import BookIcon from "@icons/BookIcon";
import HeartIcon from "@icons/HeartIcon";
import StatCard from "./StatCard";
import Divider from "@components/Divider";
import Mistakes from "@components/Mistake";

type StatsProps = {
  heartsLeft: number;
  score: number;
  wordsLeft: number;
  totalWords: number;
};

const Stats = ({ heartsLeft, wordsLeft, totalWords }: StatsProps) => {
  return (
    <div
      role="status"
      aria-label="Game statistics"
      className="flex gap-x-4 items-center justify-center"
    >
      <div className="flex gap-x-2">
      <StatCard
        srValue="Words Left"
        value={`${wordsLeft}/${totalWords}`}
        icon={<BookIcon />}
      />
      </div>
      <div className="h-10">
        <Divider orientation="vertical" />
      </div>
        <Mistakes currentMistakes={4 - heartsLeft} totalMistakes={4} />
    </div>
  );
};

export default Stats;
