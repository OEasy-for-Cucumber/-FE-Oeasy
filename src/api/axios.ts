import axios from "axios";
import { useUserStore } from "../zustand/authStore";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

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

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { setIsLoggedIn } = useUserStore.getState();

    const errorCode: string | undefined = error.response?.data?.code;

    if (
      (originalRequest.url === "/aioe/start" && errorCode === "EXPIRED_ACCESS_TOKEN") ||
      error.response?.status === 400
    ) {
      console.warn("오류 무시");
      return Promise.reject(error);
    }

    if (errorCode === "EXPIRED_ACCESS_TOKEN" && !originalRequest._retry) {
      originalRequest._retry = true;

      console.log("토큰 만료 - EXPIRED_ACCESS_TOKEN, 재발급 요청");

      try {
        const { data } = await instance.post("/auth/refresh", {});

        Cookies.set("accessToken", data.accessToken, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict"
        });
        console.log("토큰 재발급");

        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);

        Cookies.remove("accessToken");
        setIsLoggedIn(false);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 401) {
      console.warn("401 인증 에러 발생");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default instance;
