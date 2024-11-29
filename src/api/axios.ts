import axios from "axios";
import { useUserStore } from "../zustand/authStore";
import Cookies from "js-cookie";

// 일반 요청용 axios 인스턴스
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// 토큰 갱신용 axios 인스턴스 (인터셉터 없이 사용)
const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
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
    const originalRequest = error.config;
    const { setIsLoggedIn } = useUserStore.getState();

    // 특정 요청은 401 에러를 무시
    if ((originalRequest.url === "/aioe/start" && error.response?.status === 401) || error.response?.status === 400) {
      console.warn("오류 무시");
      return Promise.reject(error);
    }

    // AccessToken 만료 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

    console.log("토큰 만료 401 에러");
    

      try {
        const refreshToken = Cookies.get("refreshToken");

        // refreshToken으로 새로운 accessToken 요청
        const { data } = await refreshInstance.post("/auth/refresh", {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        });
        Cookies.set("accessToken", data.accessToken);
        console.log("토큰 재발급");
        

        // 원래 요청에 새로운 토큰 설정 후 재시도
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return instance(originalRequest);
        
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setIsLoggedIn(false);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
