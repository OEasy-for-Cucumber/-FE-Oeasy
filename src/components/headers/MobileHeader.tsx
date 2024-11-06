import { useLocation, useNavigate } from "react-router-dom";
import HamburgerIcon from "../../assets/Icon.svg";

function MobileHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const MAIN = pathname === "/";
  const LOGIN = pathname === "/login";
  const SIGNUP = pathname === "/signup";
  const MYPAGE = pathname === "/mypage";

  //페이지 이름
  let headerTitle;
  if (MAIN) {
    headerTitle = "Oeasy";
  } else if (LOGIN) {
    headerTitle = "로그인";
  } else if (SIGNUP) {
    headerTitle = "회원가입";
  } else if (MYPAGE) {
    headerTitle = "마이페이지";
  }

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className={`w-full min-w-[360px] max-w-[500px] xl:max-w-none px-6 h-[56px] flex justify-between items-center fixed
    ${pathname === "/" ? "bg-greenoe-950" : "bg-grayoe-950"}`}
    >
      {SIGNUP ? (
        <p className="text-center mx-auto">{headerTitle}</p>
      ) : (
        <>
          <button>
            <img src={HamburgerIcon} alt="메뉴아이콘" />
          </button>
          <p>{headerTitle}</p>
          <button onClick={goToLogin} className="text-xs">
            login
          </button>
        </>
      )}
    </div>
  );
}

export default MobileHeader;
