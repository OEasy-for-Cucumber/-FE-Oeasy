import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../zustand/authStore";
import instance from "../../api/axios";
import { AxiosError } from "axios";

function KakaoCallback() {
  const { user, setUser } = useUserStore.getState();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);

  const fetchData = async () => {
    if (accessTokenFetching) return;

    try {
      setAccessTokenFetching(true);

      // GET 요청으로 code를 쿼리 파라미터로 전달
      const res = await instance.post("/login/kakao/callback", {
        params: code
      });

      const { accessToken, email, nickname } = res.data;
      console.log("accessToken:", accessToken);

      // 로그인 정보를 상태에 저장
      setUser({ email, nickname, accessToken });
      setAccessTokenFetching(false);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Kakao login failed:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        });
      } else {
        console.error("Unknown error occurred:", error);
      }
      setAccessTokenFetching(false);
    }
  };

  useEffect(() => {
    if (code && !user?.accessToken) {
      const timer = setTimeout(() => {
        fetchData();
      }, 5000); // 5초 (5000ms) 후에 fetchData 실행

      // 클린업 함수로 타이머 정리
      return () => clearTimeout(timer);
    }
  }, [code, user]);

  return <div>카카오 로그인 중...</div>;
}

export default KakaoCallback;
