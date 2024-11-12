import Xicon from "../../../../public/icons/Icon.png";
import Sample from "../../../../public/img/profilesample.jpg";
import Camera from "../../../../public/icons/Camera.png";
import { useUserStore } from "../../../zustand/authStore";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/common/Input";
import { useState } from "react";
import ReactDOM from "react-dom";
import EditPassword from "./EditPassword";


function EditProfile() {
  const { user, setUser, clearUser, setIsLoggedIn } = useUserStore.getState();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [ isNickname, setIsNickname ] = useState<boolean>(false);
  const [ nicknameMsg, setNicknameMsg ] = useState<string>(""); 

  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const baseLabelClass = "transition-all duration-300 text-[13px]";
  const visibleLabelClass = "opacity-100 translate-y-0";
  const hiddenLabelClass = "opacity-0 -translate-1";

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    clearUser();
    setIsLoggedIn(false);
    navigate("/");
  };

  const changeNicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^[a-zA-Z0-9가-힣\s]+(?![ㄱ-ㅎㅏ-ㅣ])$/;
    setNickname(e.target.value);
    if (!regex.test(value)) {
      setNicknameMsg("한글,영문,숫자로 최대 8자이내로 지어주세요.");
      setIsNickname(false);
    } else {
      setIsNickname(true);
    }
  };

  const goToMypage = () => {
    navigate("/mypage")
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="bg-grayoe-950 text-white w-full min-w-[360px] max-w-[500px] xl:w-full py-4 relative h-svh">
        <div className="relative flex justify-center items-center mt-3 mb-[64px]">
          <h1 className="font-b2-semibold absolute left-1/2 transform -translate-x-1/2">계정 설정</h1>
          <button onClick={goToMypage} className="text-xl absolute right-3">
            <img src={Xicon} alt="닫기버튼" />
          </button>
        </div>

        <div className="relative my-[36px] flex justify-center">
          <img
            src={Sample}
            alt="profile"
            className="w-[80px] h-[80px] rounded-full object-cover border-grayoe-800 border-2"
          />
          <button className="absolute bottom-0 right-[38%] bg-grayoe-500 border-grayoe-800 border-2 rounded-full p-[3px]">
            <img src={Camera} alt="사진첨부" className="w-4" />
          </button>
        </div>

        <form className="px-6 grid gap-3">
          <div className="mb-4">
          <p
          className={`text-sm ${!isNickname ? "redoe" : "text-grayoe-300"}`}
        >
          닉네임
        </p>
            <Input onChange={changeNicknameHandler} isValid={isNickname}/>
            {isNickname === false && nickname !== "" ? <p className={`redoe ${visibleLabelClass} ${baseLabelClass}`}>{nicknameMsg}</p> : <p className={`${hiddenLabelClass} ${baseLabelClass}`}></p>}
          </div>

          <div className="mb-4">
            <label className="block text-grayoe-300 text-sm mb-1">이메일</label>
            <p className="text-grayoe-300">ninegeurim@gmail.com</p>
            <hr className="border-grayoe-700 mt-2" />
          </div>

          <div className="items-center">
            <div className="">
              <label className="block text-grayoe-300 text-sm mb-1">비밀번호</label>
              <div className="flex justify-between items-center">
                <div className="text-grayoe-300">●●●●●●●●</div>
                <button onClick={openModal} className="bg-grayoe-500 text-sm py-1 px-2 rounded font-c2">비밀번호 변경</button>
              </div>
            </div>
            <hr className="border-grayoe-700 mt-3" />
          </div>
        </form>
        <div className="border-b-8 my-5 border-grayoe-900" />
        <div className="flex gap-5 w-full mt-2 text-sm text-grayoe-300 bg-grayoe-950 items-center justify-center font-c2">
          <button onClick={logoutHandler}>로그아웃</button>
          <span>|</span>
          <button>회원탈퇴</button>
        </div>
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(
          <EditPassword closeModal={closeModal} />, 
          document.body
        )}
    </div>
  );
}

export default EditProfile;
