import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../pages/main";
import Login from "../pages/auth/components/Login";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />
      },
      {
        path: "/login",
        element: <Login/>
      }
    ]
  }
]);

export default router;
