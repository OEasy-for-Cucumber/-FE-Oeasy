import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../zustand/authStore";
import instance from "../../api/axios";

import { AxiosError } from 'axios';

function KakaoCallback() {
    const { user, setUser } = useUserStore.getState();
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const [accessTokenFetching, setAccessTokenFetching] = useState(false);

        
    const fetchData = async () => {

        if(accessTokenFetching) return;
        console.log("getAccessToken 호출");

            if (!code) {
                console.error("Authorization code is missing");
                return;
            }
    
            try {
                setAccessTokenFetching(true);

                const res = await instance.get(`/kakao/callback?code=${code}`);
                console.log(res.data);
    
                // localStorage.setItem("accessToken", res.data.accessToken);
                const accessToken = res.data.accessToken;
                setUser({ email: res.data.email, nickname: res.data.nickname, accessToken });
                setAccessTokenFetching(false);
                navigate("/");
            } catch (error) {
                if (error instanceof AxiosError) {
                    // AxiosError일 경우
                    console.error("Kakao login failed:", error.response?.data || error.message);
                    setAccessTokenFetching(false);
                } else {
                    // AxiosError가 아닌 경우
                    console.error("Unknown error occurred:", error);
                }
            }
        };

        useEffect(()=>{
            if(code && !user?.accessToken) {

                fetchData();
            }
        },[code, user])

    return (
        <div>카카오 로그인 중...</div>
    );
}

export default KakaoCallback;
