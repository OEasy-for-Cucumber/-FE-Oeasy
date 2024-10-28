import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../pages/main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // 최상위 경로로 App 설정
    children: [
      {
        path: "/",
        element: <Main />
      }
    ]
  }
]);

export default router;
