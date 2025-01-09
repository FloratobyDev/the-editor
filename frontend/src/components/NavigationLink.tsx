import { useScene } from "@hooks/useScene";
import ButtonText from "./typography/ButtonText";

interface NavigationLinkProps {
  label: string; // Custom label text
  scene: string; // Scene identifier to navigate to
  showBackIcon?: boolean; // Optional: control if back arrow should show
}

const NavigationLink = ({
  label,
  scene,
  showBackIcon = true,
}: NavigationLinkProps) => {
  const { changeScene } = useScene(); // Using the existing useScene hook

  return (
    <div className={`flex items-center gap-x-2`}>
      {showBackIcon && (
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4.5C10 4.5 6.00001 7.44593 6 8.5C5.99999 9.55413 10 12.5 10 12.5"
            stroke="#B7B7B7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <button
        onClick={() => changeScene(scene)}
        className="underline underline-offset-2"
      >
        <ButtonText size="md">{label}</ButtonText>
      </button>
    </div>
  );
};

export default NavigationLink;
