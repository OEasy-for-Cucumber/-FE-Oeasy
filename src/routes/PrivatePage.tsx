import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../zustand/authStore"
import { useEffect } from "react";

function PrivatePage() {
    const isLoggedIn = useUserStore.getState();
    const navigate = useNavigate();

    useEffect(()=>{
        if (!isLoggedIn) {
            navigate("/login");
        }
    },[isLoggedIn])

  return isLoggedIn ? <Outlet/> : null;
}

export default PrivatePage