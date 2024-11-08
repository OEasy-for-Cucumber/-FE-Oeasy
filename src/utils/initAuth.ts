import { useEffect } from "react";
import { useUserStore } from "../zustand/authStore";
import instance from "../api/axios";

async function useUserInitialize () {
    const { setUser, setIsLoggedIn, setIsInitialized } = useUserStore.getState();

    useEffect(()=>{
        const initUser = async () => {
            const { data } = await instance.get("/member/profile");
            const token = localStorage.getItem("accessToken");
            if(data) {
                setUser(data);
            }
            setIsInitialized(true);
            
            if(token) setIsLoggedIn(true);
        }
        initUser()
    },[setUser, setIsInitialized])

}

export default useUserInitialize