import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const TimerText = ({ children, className }: Props) => {
  const classes = classNames("text-primary font-semibold text-lg", className);
  return <h2 className={classes}>{children}</h2>;
};

export default TimerText;
