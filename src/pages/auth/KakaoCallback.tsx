import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../zustand/authStore";
import instance from "../../api/axios";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import Loading from "../../components/common/Loading";

function KakaoCallback() {
  const { setUser, setIsLoggedIn } = useUserStore.getState();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  const encodedCode = encodeURIComponent(code as string);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.post(`/login/kakao/callback?code=${encodedCode}`, {
          headers: { "Content-Type": "application/json" }
        });
        const { accessToken, email, nickname, memberPk } = res.data;
        Cookies.set("accessToken", res.data.accessToken);

        if (accessToken && email && nickname) {
          setUser({ accessToken, email, nickname, memberPk });
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
    fetchData();
  }, [code]);

  return (
    <div className="w-full">
      <Loading/>
    </div>
  )
}

export default KakaoCallback;
