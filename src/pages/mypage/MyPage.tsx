import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { useUserStore } from "../../zustand/authStore";
import instance from "../../api/axios";
import ProfileSample from "../../../public/img/profilesample.jpg"

function MyPage() {
  const { user, setUser, clearUser, setIsLoggedIn } = useUserStore.getState();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    clearUser();
    setIsLoggedIn(false);
    navigate("/");
  }

  const getUserData = async () => {
    const token = getCookie("accessToken"); // 쿠키에서 토큰을 가져오는 함수
    if (!token) {
      console.error("토큰이 없습니다. 로그인 후 다시 시도하세요.");
      return;
    }

    try {
      const response = await instance.get("/member/profile", {
        withCredentials: true,
      });
      setUser(response.data); // 상태에 사용자 데이터 설정
      console.log("회원 정보:", response.data);
    } catch (error) {
      console.error("회원 정보 조회 실패:", error);
    }
  };
  
  // 쿠키에서 특정 이름의 값을 추출하는 함수
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };
  
  getUserData();
  
  
  return (
    <div>
      <div className="w-full flex py-4">
        <div className="w-full flex gap-2 items-center">
          <div className="w-[48px] h-[48px] rounded-full bg-profile_sample bg-cover p-2 text-black">
          </div>
          <h6 className="font-h6">{user?.nickname}</h6>
        </div>
        <Button size="small">프로필 편집</Button>
      </div>
      <button onClick={logoutHandler}>로그아웃</button>
    </div>
  );
}

export default MyPage;
