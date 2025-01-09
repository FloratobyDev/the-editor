type StatCardProps = {
  value: string;
  srValue: string;
  icon: React.ReactNode;
};

const StatCard = ({ srValue, value, icon }: StatCardProps) => {
  return (
    <div className="px-6 py-3 bg-white border border-[#F0F0F0] rounded-md box-border flex items-center justify-center gap-x-2 text-sub-lg font-semibold">
      <span className="sr-only">{srValue}</span>
      <span className="text-primary text-sub-lg font-semibold leading-tight" aria-live="polite">
        {value}
      </span>
      {icon}
    </div>
  );
};

export default StatCard;
