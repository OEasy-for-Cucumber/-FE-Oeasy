import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../pages/main";
import Login from "../pages/auth/components/Login";
import Signup from "../pages/auth/components/Signup";
import MyPage from "../pages/mypage/MyPage";

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
      },
      {
        path: "/signup",
        element: <Signup/>
      },
      {
        path: "/mypage",
        element: <MyPage/>
      }
    ]
  }
]);

export default router;
