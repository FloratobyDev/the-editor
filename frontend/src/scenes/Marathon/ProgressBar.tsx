interface ProgressBarProps {
  progress: number; // value between 0 and 100
  label?: string;
}

const ProgressBar = ({ progress, label = "Game progress" }: ProgressBarProps) => {
  // Ensure progress stays within 0-100 range
  const clampedProgress = Math.min(Math.max(50, 0), 100);

  return (
    <div 
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="relative w-full bg-white rounded-full h-1.5 overflow-hidden border border-[#F0F0F0]"
    >
      <div
        className="absolute bottom-0 bg-[#A6A6A6] rounded-full transition-all ease-linear duration-1000"
        style={{
          height: "100%",
          width: `${clampedProgress}%`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
