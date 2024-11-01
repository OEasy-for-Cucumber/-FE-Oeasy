import { useNavigate } from "react-router-dom";
import Button from "../Button"

function WebHeader() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  }
  
  return (
    <div className="w-full h-[80px] bg-transparent flex items-center px-8">
      <div className="flex items-center">
        <p className="text-white text-xl mr-8">logo</p>
      </div>
      <div className="flex flex-1 justify-end items-center space-x-8">
        <button className="text-white">오이커뮤니티</button>
        <button className="text-white">오이투표</button>
        <button className="text-white">오이레시피</button>
        <Button onClick={goToLogin} isActive={true}>
          Login
        </Button>
      </div>
    </div>
  );
  
}

export default WebHeader