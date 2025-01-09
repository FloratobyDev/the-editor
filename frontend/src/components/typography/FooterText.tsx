import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const FooterText = ({ children, className }: Props) => {
  const classes = classNames("text-faded font-normal text-xs", className);
  return <h2 className={classes}>{children}</h2>;
};

export default FooterText;
