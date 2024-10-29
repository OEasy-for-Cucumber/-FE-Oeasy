import { Outlet } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";

function App(): React.JSX.Element {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
