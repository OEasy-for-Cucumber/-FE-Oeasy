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

const refreshInstance = axios.create({
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

    if ((originalRequest.url === "/aioe/start" && error.response?.status === 401) || error.response?.status === 400) {
      console.warn("오류 무시");
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      console.log("토큰 만료 401 에러");

      try {
        const refreshToken = Cookies.get("refreshToken");
        const { data } = await refreshInstance.post(
          "/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`
            }
          }
        );
        Cookies.set("accessToken", data.accessToken);
        console.log("토큰 재발급");
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
