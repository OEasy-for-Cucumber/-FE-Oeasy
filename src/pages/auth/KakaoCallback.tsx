import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../zustand/authStore";

function KakaoCallback() {
    const { setUser } = useUserStore.getState();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams(location.search);
            const code = params.get('code');

            if (!code) {
                console.error("Authorization code is missing");
                return;
            }

            try {
                const res = await axios.get(`http://54.180.153.36:8080/kakao/callback?code=${code}`);
                console.log(res.data);

                localStorage.setItem("accessToken", res.data.accessToken);
                setUser({ email: res.data.email, nickname: res.data.nickname });

                // 홈으로 이동
                navigate("/");
            } catch (error) {
                console.error("Kakao login failed:", error);
            }
        };
        fetchData();
    }, [location.search, navigate]);

    return (
        <div>카카오 로그인 중...</div>
    );
}

export default KakaoCallback;
