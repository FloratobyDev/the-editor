import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
  size: "lg" | "md" | "sm";
};

const ButtonText = ({ children, className, size }: Props) => {
  const classes = classNames(
    "text-primary",
    {
      "text-lg font-bold": size === "lg",
      "text-md font-semibold": size === "md",
      "text-sm font-semibold": size === "sm",
    },
    className
  );
  return <h2 className={classes}>{children}</h2>;
};

export default ButtonText;
