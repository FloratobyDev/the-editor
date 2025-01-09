import Small from "./typography/Small";

interface BadgeProps {
  label: string;
}

const Badge = ({ label }: BadgeProps) => {
  return (
    <div className="rounded-md px-3 py-1.5 bg-gray-bg border border-border-gray capitalize">
      <Small>{label}</Small>
    </div>
  );
};

export default Badge;
