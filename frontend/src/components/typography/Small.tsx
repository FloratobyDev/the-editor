import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
  textVariant: "primary" | "secondary";
};

const Small = ({ children, className, textVariant }: Props) => {
  const classes = classNames(
    "font-semibold text-sm leading-none",
    {
      "text-secondary": textVariant === "secondary",
      "text-primary": textVariant === "primary",
    },
    className
  );
  return <h2 className={classes}>{children}</h2>;
};

export default Small;
