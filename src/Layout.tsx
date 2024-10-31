import { useLocation } from "react-router-dom";

interface layoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className={`${location.pathname === "/" ? "bg-greenoe-950" : "bg-grayoe-950"} h-screen`}>
      <div className=" mx-auto px-6 min-w-[360px] max-w-[500px] xl:max-w-none">{children}</div>
    </div>
  );
};

export default Layout;
