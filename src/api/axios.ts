import axios from "axios";
import { useUserStore } from "../zustand/authStore";
import Cookies from "js-cookie";

// 일반 요청용 axios 인스턴스
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 갱신용 axios 인스턴스 (인터셉터 없이 사용)
const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { setIsLoggedIn } = useUserStore.getState();
    const originalRequest = error.config;

    // AccessToken 만료 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          console.error("Refresh token 없음. 로그인 상태 초기화");
          setIsLoggedIn(false);
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // refreshToken으로 새로운 accessToken 요청
        const { data } = await refreshInstance.post("/auth/refresh",{
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (data.accessToken) {
          Cookies.set("accessToken", data.accessToken, { expires: 1 });

          // 원래 요청에 새로운 토큰 설정 후 재시도
          originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
          return instance(originalRequest); // 원래 요청 재시도
        } else {
          throw new Error("새로운 accessToken을 얻을 수 없음");
        }
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        setIsLoggedIn(false);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
