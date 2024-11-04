import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Login from "../pages/auth/components/Login";
import Signup from "../pages/auth/components/Signup";
import Recipe from "../pages/recipes";

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
        element: <Recipe />
      }
    ]
  }
]);

export default router;
