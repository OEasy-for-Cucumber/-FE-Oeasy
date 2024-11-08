import { useEffect } from "react";
import { useUserStore } from "../zustand/authStore";
import instance from "../api/axios";

function useUserInitialize() {
  const { setUser, setIsLoggedIn, setIsInitialized } = useUserStore.getState();

  useEffect(() => {
    const initUser = async () => {
      try {
        const { data } = await instance.get("/member/profile");
        const token = localStorage.getItem("accessToken");

        if (data) {
          setUser(data);
        }

        setIsInitialized(true);

        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("사용자 초기화 오류:", error);
      }
    };

    initUser();
  }, [setUser, setIsLoggedIn, setIsInitialized]);
}

export default useUserInitialize;
