import axios from "axios"
import { useEffect } from "react"
import { useUserStore } from "../../zustand/authStore"

function KakaoCallback() {
    const { setUser } = useUserStore.getState();
    useEffect(()=>{
        const fetchData = async()=> {
            try {
                const res = await axios.get("http://54.180.153.36:8080/kakao/login");
                const { accessToken, email, nickname} = res.data;

                localStorage.setItem("accessToken", accessToken);
                setUser({email, nickname});
                window.location.href = "/";
            } catch (error) {
                console.error("Kakao login failed:", error);
                
            }
        }
        fetchData();
    },[])

  return (
    <div>카카오 로그인 중...</div>
  )
}

export default KakaoCallback