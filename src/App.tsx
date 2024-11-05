import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import MobileHeader from "./components/headers/MobileHeader";
import WebHeader from "./components/headers/WebHeader";

function App(): React.JSX.Element {
  const { pathname } = useLocation();

  const hideHeader = pathname === "/login";

  return (
    <>
      <Layout>
        <div className="xl:hidden w-full flex justify-center">{!hideHeader && <MobileHeader />}</div>
        <div className="hidden w-full xl:flex justify-center">{!hideHeader && <WebHeader />}</div>
        <div className="pt-[56px] xl:pt-[80px]">
          <Outlet />
        </div>
      </Layout>
    </>
  );
}

export default App;
