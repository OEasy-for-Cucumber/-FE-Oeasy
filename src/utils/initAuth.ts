import { useEffect } from "react";
import { useUserStore } from "../zustand/authStore";
import instance from "../api/axios";

function useUserInitialize() {
  const { setUser, setIsLoggedIn, setIsInitialized } = useUserStore.getState();

  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setIsInitialized(true);
        return;
      }

      try {
        const { data } = await instance.get("/member/profile");

        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.error("사용자 초기화 오류:", error);
      } finally {
        setIsLoggedIn(true);
        setIsInitialized(true);
      }
    };

    initUser();
  }, [setUser, setIsLoggedIn, setIsInitialized]);
}

export default useUserInitialize;
