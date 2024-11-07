import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Login from "../pages/auth/components/Login";
import Signup from "../pages/auth/components/Signup";
import Recipes from "../pages/recipes";
import MyPage from "../pages/mypage/MyPage";
import KakaoCallback from "../pages/auth/KakaoCallback";
import Votechat from "../pages/vote-chat";
import Community from "../pages/community";

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
        path: "/mypage",
        element: <MyPage />
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
        element: <Community/>
      }
    ]
  }
]);

export default router;
