import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "@/zustand/authStore";
import Login from "@/pages/auth/components/Login";

function PrivatePage() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);
  return isLoggedIn ? <Outlet /> : <Login />;
}

export default PrivatePage;
