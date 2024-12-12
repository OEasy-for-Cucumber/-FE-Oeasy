import { useLocation, useNavigate } from "react-router-dom";
import HamburgerIcon from "../../assets/Icon.svg";
import { useState } from "react";
import HamburgerModal from "./HamburgerModal";
import { useUserStore } from "../../zustand/authStore";
import Sample from "../../../public/img/defaultProfile.webp";

function MobileHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const { isLoggedIn } = useUserStore.getState();

  const MAIN = pathname === "/";
  const LOGIN = pathname === "/login";
  const SIGNUP = pathname === "/signup";
  const MYPAGE = pathname === "/mypage";
  const VOTE = pathname === "/vote-chat";
  const COMMUNITY = pathname === "/community";
  const RECIPE = pathname === "/recipe";

  let headerTitle;
  if (MAIN) {
    headerTitle = "Oeasy";
  } else if (LOGIN) {
    headerTitle = "로그인";
  } else if (SIGNUP) {
    headerTitle = "회원가입";
  } else if (MYPAGE) {
    headerTitle = "마이페이지";
  } else if (VOTE) {
    headerTitle = "오이 투표";
  } else if (COMMUNITY) {
    headerTitle = "오이 커뮤니티";
  } else if (RECIPE) {
    headerTitle = "오이 레시피";
  }

  const goToLogin = () => {
    navigate("/login");
  };

  const goToMypage = () => {
    navigate("/mypage");
  };

  const toggleModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className={`w-full min-w-[360px] max-w-[520px] xl:max-w-none px-3 py-[18px] h-[56px] flex justify-between items-center fixed z-50
    ${pathname === "/" ? "bg-greenoe-950" : "bg-grayoe-950"}`}
    >
      {SIGNUP ? (
        <p className="text-center mx-auto">{headerTitle}</p>
      ) : (
        <>
          <button onClick={toggleModal}>
            <img src={HamburgerIcon} alt="메뉴아이콘" className="p-2" />
          </button>
          {isModalOpen && (
            <HamburgerModal toggleModal={isModalOpen} onClose={toggleModal} setIsModalOpen={setIsModalOpen} />
          )}
          <p>{headerTitle}</p>
          {!isLoggedIn ? (
            <button onClick={goToLogin} className="text-xs p-2">
              Login
            </button>
          ) : pathname === "/mypage" ? (
            <div className="w-[40px]"></div>
          ) : (
            <button onClick={goToMypage} className="p-2">
              <img
                src={!user?.memberImage ? Sample : user.memberImage}
                alt="프로필이미지"
                className="w-6 h-6 rounded-full"
              />
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default MobileHeader;
