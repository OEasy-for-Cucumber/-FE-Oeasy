import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../zustand/authStore";
import instance from "../../api/axios";
import axios, { AxiosError } from "axios";

function KakaoCallback() {
  const { user, setUser } = useUserStore.getState();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  const encodedCode = encodeURIComponent(code as string);
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);

  console.log(encodedCode);
  
  const fetchData = async () => {
    if (accessTokenFetching) return;

    try {
      setAccessTokenFetching(true);
      const res = await instance.post("/login/kakao/callback?code=${encodedCode}",{
        headers: { "Content-Type": "application/json", }
      })
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
      fetchData();
    }
  }, [code, user]);

  return <div>카카오 로그인 중...</div>;
}

export default KakaoCallback;
