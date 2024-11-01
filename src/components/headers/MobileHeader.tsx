import { useNavigate } from "react-router-dom";
import HamburgerIcon from "../../assets/Icon.svg";

function MobileHeader() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="w-full bg-transparent h-[56px] flex justify-between items-center">
      <img src={HamburgerIcon} alt="메뉴아이콘" />
      <p>Oeasy</p>
      <button onClick={goToLogin} className="text-xs">
        Login
      </button>
    </div>
  );
}

export default MobileHeader;
