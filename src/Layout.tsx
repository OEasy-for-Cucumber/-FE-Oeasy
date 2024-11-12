import { useLocation } from "react-router-dom";

interface layoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const location = useLocation();
  const noneLayout = location.pathname === "/" || location.pathname === "/vote-chat";

  return (
    <div className={`${location.pathname === "/" ? "bg-greenoe-950" : "bg-grayoe-950 h-screen"}`}>
      <div className={`${noneLayout ? "" : "px-6"} mx-auto min-w-[360px] max-w-[520px] xl:max-w-none `}>{children}</div>
    </div>
  );
};

export default Layout;
