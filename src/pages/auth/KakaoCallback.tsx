import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../zustand/authStore";
import instance from "../../api/axios";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

function KakaoCallback() {
  const { user, setUser, setIsLoggedIn } = useUserStore.getState();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  const encodedCode = encodeURIComponent(code as string);

  const fetchData = async () => {
    try {
        const res = await instance.post(
            `/login/kakao/callback?code=${encodedCode}`,
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        const { accessToken, refreshToken, email, nickname } = res.data;
        Cookies.set("accessToken", res.data.accessToken);
        Cookies.set("refreshToken", res.data.refreshToken);



        if (accessToken && refreshToken && email && nickname ) {
            setUser({ accessToken, refreshToken, email, nickname });
            setIsLoggedIn(true);
            navigate("/");
        } else {
            throw new Error("카카오 로그인에서 받은 응답 데이터가 올바르지 않습니다.");
        }
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
