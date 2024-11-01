import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import MobileHeader from "./components/headers/MobileHeader";
import WebHeader from "./components/headers/WebHeader";

function App(): React.JSX.Element {
  const { pathname } = useLocation();

  const hideHeader = pathname === "/login" || pathname === "/signup"
  return (
    <>
      <Layout>
        <div className="xl:hidden">
      {!hideHeader && <MobileHeader/>}
      </div>
      <div className="hidden xl:block">
      {!hideHeader && <WebHeader/>}
      </div>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
