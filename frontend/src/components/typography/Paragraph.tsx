import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Paragraph = ({ children, className }: Props) => {
  const classes = classNames("text-primary font-medium text-lg leading-text-wide", className);
  return <h2 className={classes}>{children}</h2>;
};

export default Paragraph;
