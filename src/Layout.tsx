interface layoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  return <div className="mx-auto px-6 min-w-[360px] max-w-[500px]">{children}</div>;
};

export default Layout;
