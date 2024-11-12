import axios from "axios";

// axios 인스턴스 생성
const instance = axios.create({
  // baseURL: "http://54.180.153.36:8080", // 기본 URL 설정
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000, // 요청 타임아웃 설정 (5초)
  headers: { 
    "Content-Type": "application/json",
  } // 기본 헤더 설정
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 인증 토큰 가져오기  
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 토큰이 있을 경우 헤더에 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => response, // 응답 데이터 가공이 필요하면 여기에 추가
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // 401 에러 (인증 오류) 발생 시 처리
        console.error("401에러 인증오류");
        // 로그아웃 처리나 로그인 페이지로 이동 등의 로직 추가 가능
      } else if (error.response.status === 500) {
        console.error("500에러 서버오류");
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
