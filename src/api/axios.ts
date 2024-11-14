import axios from "axios";
import { useUserStore } from "../zustand/authStore";
import Cookies from "js-cookie";

// axios 인스턴스 생성 
const instance = axios.create({
  // baseURL: "http://54.180.153.36:8080", // 기본 URL 설정
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000, // 요청 타임아웃 설정 (5초)
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }, // 기본 헤더 설정
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken"); // 인증 토큰 가져오기
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // 토큰이 있을 경우 헤더에 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { setIsLoggedIn } = useUserStore.getState();
    const originalRequest = error.config;

    // AccessToken 만료 시
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // 플래그 설정하여 재시도 방지

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          setIsLoggedIn(false);
          return Promise.reject(error);
        }

        const { data } = await instance.post("/auth/refresh", { refreshToken });
        if (data.accessToken) {
          // 새로운 accessToken으로 업데이트
          Cookies.set("accessToken", data.accessToken, { expires: 1 });
          localStorage.setItem("accessToken", data.accessToken);

          // 원래 요청에 새로운 토큰 설정 후 재시도
          originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
          return instance(originalRequest);
        } else {
          throw new Error("새로운 액세스 토큰을 얻을 수 없습니다.");
        }
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        setIsLoggedIn(false);
        window.location.href = "/login"; // 로그인 페이지로 리다이렉트
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export default instance;
