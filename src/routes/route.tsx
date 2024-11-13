import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Login from "../pages/auth/components/Login";
import Signup from "../pages/auth/components/Signup";
import Recipes from "../pages/recipes";
import MyPage from "../pages/mypage/MyPage";
import KakaoCallback from "../pages/auth/KakaoCallback";
import Votechat from "../pages/vote-chat";
import Community from "../pages/community/list";
import PrivatePage from "./PrivatePage";
import Test from "../pages/test";
import Detail from "../pages/community/detail/[id]";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/recipe",
        element: <Recipes />
      },
      {
        path: "/kakao/callback",
        element: <KakaoCallback />
      },
      {
        path: "/vote-chat",
        element: <Votechat />
      },
      {
        path: "/community",
        element: <Community />
      },
      {
        element: <PrivatePage />,
        children: [
          { path: "/mypage", element: <MyPage /> },
        ]
      },
      {
        path: "/test",
        element: <Test />
      },
      {
        path: "/detail/:id",
        element: <Detail />
      }
    ]
  }
]);

export default router;
