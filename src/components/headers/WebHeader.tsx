import { useLocation, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { useUserStore } from "../../zustand/authStore";

function WebHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, isLoggedIn } = useUserStore.getState();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToCommunity = () => {
    navigate("/community");
  }

  const goToVote = () => {
    navigate("/vote-chat");
  }

  const goToRecipes = () => {
    navigate("/recipe")
  }

  const goToMypage = () => {
    navigate("/mypage");
  }

  return (
    <div
      className={`w-full h-[80px] px-6 flex items-center fixed ${pathname === "/" ? "bg-greenoe-950" : "bg-grayoe-950"}`}
    >
      <div className="flex items-center">
        <button onClick={goToHome} className="text-white text-xl mr-8">
          logo
        </button>
      </div>
      <div className="flex flex-1 justify-end items-center space-x-8">
        <button onClick={goToCommunity} className="text-white">오이커뮤니티</button>
        <button onClick={goToVote} className="text-white">오이투표</button>
        <button onClick={goToRecipes} className="text-white">오이레시피</button>
        {!isLoggedIn 
        ? 
        <Button onClick={goToLogin} isActive={true}>
          Login
        </Button>
        : <button onClick={goToMypage}>My</button>}
        
        
      </div>
    </div>
  );
}

export default WebHeader;
