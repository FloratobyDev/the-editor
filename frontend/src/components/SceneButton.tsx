type Props = {
  label: string;
  onClick: () => void;
};

const SceneButton = ({ onClick, label }: Props) => {
  return (
    <button
      className="shadow-shadow-button px-8 text-lg font-bold text-primary bg-white rounded-lg w-full h-16 hover:shadow-shadow-hover transition-shadow duration-300 ease-in-out"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SceneButton;
