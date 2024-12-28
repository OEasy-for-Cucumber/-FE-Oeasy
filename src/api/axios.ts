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

    const errorMsg: string = error.response?.data?.message;

    if (errorMsg === "리프레시 토큰이 만료되었습니다.") {
      Cookies.remove("accessToken");
      setIsLoggedIn(false);
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (
      ["유효하지 않은 액세스 토큰입니다.", "지원하지 않는 토큰입니다.", "잘못된 토큰 형식입니다."].includes(errorMsg)
    ) {
      console.warn(`유효하지 않은 토큰: ${errorMsg}`);
      Cookies.remove("accessToken");
      setIsLoggedIn(false);
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (errorMsg === "액세스 토큰이 만료되었습니다." && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await instance.post("/auth/refresh", {});

        Cookies.set("accessToken", data.accessToken, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict"
        });

        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);

      }
    }

    return Promise.reject(error);
  }
);

export default instance;
