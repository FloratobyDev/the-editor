import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const H1 = ({ children, className }: Props) => {
  const classes = classNames("text-primary font-bold text-xl", className);
  return <h1 className={classes}>{children}</h1>;
};
