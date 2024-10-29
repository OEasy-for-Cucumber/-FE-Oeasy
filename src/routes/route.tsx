import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../pages/main";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />
      }
    ]
  }
]);

export default router;
