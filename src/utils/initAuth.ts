import { useEffect } from "react";
import { useUserStore } from "../zustand/authStore";
import instance from "../api/axios";

function useUserInitialize() {
  const { setUser, setIsLoggedIn, setIsInitialized } = useUserStore.getState();

  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const { data } = await instance.get("/member/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (data) {
            setUser(data);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("사용자 초기화 오류:", error);
        }
      }
      setIsInitialized(true);  // 초기화 완료 상태를 설정
    };

    initUser();
  }, [setUser, setIsLoggedIn, setIsInitialized]);
}

export default useUserInitialize;