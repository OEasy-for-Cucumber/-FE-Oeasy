import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import MobileHeader from "./components/headers/MobileHeader";
import WebHeader from "./components/headers/WebHeader";
import { useUserStore } from "./zustand/authStore";
import useUserInitialize from "./utils/initAuth";
import Loading from "./components/common/Loading";
import { useEffect } from "react";

function App(): React.JSX.Element {
  const { pathname } = useLocation();
  const isInitialize = useUserStore((state) => state.isInitialized);
  useUserInitialize();
  const hideHeader = pathname === "/login";

  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
  }, []);

  if (!isInitialize) {
    return <Loading className="w-[30%] mx-auto mt-[200px]" />;
  }

  return (
    <>
      <Layout>
        <div className="xl:hidden w-full flex justify-center">{!hideHeader && <MobileHeader />}</div>
        <div className="hidden w-full xl:flex justify-center">
          <WebHeader />
        </div>
        <div className="pt-[56px] xl:pt-[80px]">
          <Outlet />
        </div>
      </Layout>
    </>
  );
}

export default App;
