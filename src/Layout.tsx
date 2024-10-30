interface layoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  return <div className="mx-auto px-6 min-w-[360px] max-w-[500px] xl:max-w-none">{children}</div>;
};

export default Layout;
