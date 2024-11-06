import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button";

function WebHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goToLogin = () => {
    navigate("/login");
  };
  
  const goToHome = () => {
    navigate("/");
  }

  return (
    <div className={`w-full h-[80px] px-6 flex items-center fixed ${pathname === "/" ? "bg-greenoe-950" : "bg-grayoe-950"}`}>
      <div className="flex items-center">
        <button onClick={goToHome} className="text-white text-xl mr-8">logo</button>
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

export default WebHeader;
