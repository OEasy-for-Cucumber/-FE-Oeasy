import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { useUserStore } from "../../zustand/authStore";

function MyPage() {
  const { user, clearUser, setIsLoggedIn } = useUserStore.getState();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    clearUser();
    setIsLoggedIn(false);
    navigate("/");
  }

  console.log(user);
  
  return (
    <div>
      <div className="w-full flex py-4">
        <div className="w-full flex gap-2 items-center">
          <div className="w-[48px] h-[48px] rounded-full bg-white p-2 text-black"></div>
          <h6 className="font-h6">{user?.nickname}</h6>
        </div>
        <Button size="small">프로필 편집</Button>
      </div>
      <button onClick={logoutHandler}>로그아웃</button>
    </div>
  );
}

export default MyPage;
