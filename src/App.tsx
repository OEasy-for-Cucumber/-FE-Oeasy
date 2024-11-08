import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import MobileHeader from "./components/headers/MobileHeader";
import WebHeader from "./components/headers/WebHeader";
import { useUserStore } from "./zustand/authStore";
import useUserInitialize from "./utils/initAuth";

function App(): React.JSX.Element {
  const { pathname } = useLocation();
  const isInitialize = useUserStore((state)=> state.isInitialized);

  const hideHeader = pathname === "/login";

  useUserInitialize();

  if(!isInitialize) {
    return <div>로딩중...</div>
  }

  return (
    <>
      <Layout>
        <div className="xl:hidden w-full flex justify-center">{!hideHeader && <MobileHeader />}</div>
        <div className="hidden w-full xl:flex justify-center"><WebHeader /></div>
        <div className="pt-[56px] xl:pt-[80px]">
          <Outlet />
        </div>
      </Layout>
    </>
  );
}

export default App;
