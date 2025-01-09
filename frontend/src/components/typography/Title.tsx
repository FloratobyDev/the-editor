type Props = {
  children: React.ReactNode;
};

const Title = ({ children }: Props) => {
  return <h1 className="text-xl font-bold text-primary">{children}</h1>;
};

export default Title;
