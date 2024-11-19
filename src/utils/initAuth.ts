import { useEffect } from "react";
import { useUserStore } from "../zustand/authStore";
import instance from "../api/axios";
import Cookies from "js-cookie";

function useUserInitialize() {
  const { setUser, setIsLoggedIn, setIsInitialized } = useUserStore.getState();
  const token = Cookies.get("accessToken");

  useEffect(() => {
    const initUser = async () => {
      if (!token) {
        setIsInitialized(true);
        return;
      }

      try {
        const { data } = await instance.get("/member/profile");
        if (data) {
          setUser(data);
        }
        setIsLoggedIn(true);
        setIsInitialized(true);
      } catch (error) {
        console.error("사용자 초기화 오류:", error);
      }
    };
    initUser();
  }, [token, setIsLoggedIn, setIsInitialized]);
}

export default useUserInitialize;
