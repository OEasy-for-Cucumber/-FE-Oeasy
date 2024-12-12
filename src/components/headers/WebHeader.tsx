import { useLocation, useNavigate } from "react-router-dom";
import Sample from "@/assets/img/defaultProfile.webp";
import Logo from "@/assets/icons/logo.webp";
import { useUserStore } from "@/zustand/authStore";
import Button from "../common/Button";

function WebHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoggedIn } = useUserStore.getState();
  const user = useUserStore((state) => state.user);

  const goToLogin = () => {
    navigate("/login");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToCommunity = () => {
    navigate("/community");
  };

  const goToVote = () => {
    navigate("/vote-chat");
  };

  const goToRecipes = () => {
    navigate("/recipe");
  };

  const goToMypage = () => {
    navigate("/mypage");
  };

  return (
    <div
      className={`w-full min-w-[1440px] h-[80px] px-[80px] flex items-center fixed ${pathname === "/" ? "bg-greenoe-950" : "bg-grayoe-950"}`}
    >
      <div className="flex items-center">
        <button onClick={goToHome} className="text-white text-xl mr-8">
          <img src={Logo} alt="로고" className="w-[95px]" />
        </button>
      </div>
      <div className="flex flex-1 justify-end items-center space-x-8">
        <button
          onClick={goToCommunity}
          className={`${pathname === "/community" ? "text-greenoe-600" : "text-white"} hover:text-greenoe-600`}
        >
          오이커뮤니티
        </button>
        <button
          onClick={goToVote}
          className={`${pathname === "/vote-chat" ? "text-greenoe-600" : "text-white"} hover:text-greenoe-600`}
        >
          오이투표
        </button>
        <button
          onClick={goToRecipes}
          className={`${pathname === "/recipe" ? "text-greenoe-600" : "text-white"} hover:text-greenoe-600`}
        >
          오이레시피
        </button>
        {!isLoggedIn ? (
          <Button size="xs" onClick={goToLogin} isActive={true}>
            Login
          </Button>
        ) : (
          <button onClick={goToMypage}>
            <img
              src={!user?.memberImage ? Sample : user.memberImage}
              alt="프로필이미지"
              className="w-[40px] h-[40px] rounded-full"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default WebHeader;
