import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "@/components/common/Loading";
import LikeRecipes from "@/pages/like-recipes";
import App from "@/App";
import PrivatePage from "./PrivatePage";

const Home = lazy(() => import("@/pages/home"));
const Login = lazy(() => import("@/pages/auth/components/Login"));
const Signup = lazy(() => import("@/pages/auth/components/Signup"));
const Recipes = lazy(() => import("@/pages/recipes"));
const KakaoCallback = lazy(() => import("@/pages/auth/KakaoCallback"));
const Votechat = lazy(() => import("@/pages/vote-chat"));
const Community = lazy(() => import("@/pages/community"));
const MyPage = lazy(() => import("@/pages/mypage/MyPage"));
const RecipeDetail = lazy(() => import("@/pages/recipes/detail/[id]"));
const Detail = lazy(() => import("@/pages/community/detail/[id]/Detail"));
const Upload = lazy(() => import("@/pages/community/upload/Upload"));

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        )
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        )
      },
      {
        path: "/recipe",
        element: (
          <Suspense fallback={<Loading />}>
            <Recipes />
          </Suspense>
        )
      },
      {
        path: "/kakao/callback",
        element: (
          <Suspense fallback={<Loading />}>
            <KakaoCallback />
          </Suspense>
        )
      },
      {
        path: "/vote-chat",
        element: (
          <Suspense fallback={<Loading />}>
            <Votechat />
          </Suspense>
        )
      },
      {
        path: "/community",
        element: (
          <Suspense fallback={<Loading />}>
            <Community />
          </Suspense>
        )
      },
      {
        path: "/community/:page",
        element: (
          <Suspense fallback={<Loading />}>
            <Community />
          </Suspense>
        )
      },
      {
        element: <PrivatePage />,
        children: [
          {
            path: "/mypage",
            element: (
              <Suspense fallback={<Loading />}>
                <MyPage />
              </Suspense>
            )
          }
        ]
      },
      {
        path: "/community/detail/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Detail />
          </Suspense>
        )
      },
      {
        path: "/community/detail/:id/:page",
        element: (
          <Suspense fallback={<Loading />}>
            <Detail />
          </Suspense>
        )
      },
      {
        path: "/recipe-detail/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <RecipeDetail />
          </Suspense>
        )
      },
      {
        path: "/community/upload",
        element: (
          <Suspense fallback={<Loading />}>
            <Upload />
          </Suspense>
        )
      },
      {
        path: "/like-recipes",
        element: (
          <Suspense fallback={<Loading />}>
            <LikeRecipes />
          </Suspense>
        )
      }
    ]
  }
]);

export default router;
