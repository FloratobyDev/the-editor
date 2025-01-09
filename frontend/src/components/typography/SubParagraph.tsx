import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const SubParagraph = ({ children, className }: Props) => {
  const classes = classNames("text-muted font-medium text-sub-lg", className);
  return <h2 className={classes}>{children}</h2>;
};

export default SubParagraph;
