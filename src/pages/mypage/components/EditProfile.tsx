import Xicon from "../../../../public/icons/Icon.png";
import Sample from "../../../../public/img/profilesample.jpg";
import Camera from "../../../../public/icons/Camera.png";
import { useUserStore } from "../../../zustand/authStore";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/common/Input";
import { useState } from "react";
import ReactDOM from "react-dom";
import EditPassword from "./EditPassword";
import Cookies from "js-cookie";
import instance from "../../../api/axios";
import axios, { AxiosError } from "axios";

function EditProfile({ handleEditModal }: { handleEditModal: () => void }) {
  const { user, setUser, clearUser, setIsLoggedIn } = useUserStore.getState();
  const navigate = useNavigate();

  const [newNickname, setNewNickname] = useState<string>(user!.nickname);
  const [newPassword, setNewPassword] = useState<string>("");

  const [isNickname, setIsNickname] = useState<boolean>(true);
  const [nicknameMsg, setNicknameMsg] = useState<string>("");

  const [profileImg, setProfileImg] = useState<File | null>();
  const [profileImgUrl, setProfileImgUrl] = useState<string>();

  const [isNewPasswordModalOpen, setIsNewPasswordModalOpen] = useState<boolean>(false);

  const baseLabelClass = "transition-all duration-300 text-[13px]";
  const visibleLabelClass = "opacity-100 translate-y-0";
  const hiddenLabelClass = "opacity-0 -translate-1";

  const logoutHandler = () => {
    Cookies.remove("accessToken");
    if(confirm("로그아웃 하시겠습니까?")){
     clearUser();
    setIsLoggedIn(false);
    navigate("/"); 
    } else return;
    
  };

  const changeNicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^[a-zA-Z0-9가-힣\s]+(?![ㄱ-ㅎㅏ-ㅣ])$/;
    setNewNickname(e.target.value);
    if (!regex.test(value)) {
      setNicknameMsg("한글,영문,숫자로 최대 8자이내로 지어주세요.");
      setIsNickname(false);
    } else {
      setIsNickname(true);
    }
  };

  const ChangeImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setProfileImg(file);
    setProfileImgUrl(URL.createObjectURL(file));
  };

  const editProfile = async () => {
    const url = profileImgUrl?.replace("blob:", "")
    try {
      const { data } = await instance.patch("/member/profile-picture", {
        imageName: profileImg?.name,
        imageUri: url || ""
      });
      console.log(data);// 성공적으로 받은 데이터 출력
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // AxiosError 타입일 경우에만 처리
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        // 예상치 못한 에러
        console.error("Unexpected error:", error);
      }
    }

    // const { data: nicknameData } = await instance.patch("/member/nickname", {
    //   newNickname: newNickname
    // })
  };

  const handleNewPasswordModal = () => {
    setIsNewPasswordModalOpen((prev) => !prev);
  };

  const resetNicknameValue = () => {
    setNewNickname("");
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="bg-grayoe-950 text-white w-full min-w-[360px] max-w-[520px] xl:w-full py-4 relative h-svh">
        <div className="relative flex justify-center items-center mt-3 mb-[64px]">
          <h1 className="font-b2-semibold absolute left-1/2 transform -translate-x-1/2">계정 설정</h1>
          <button type="button" onClick={handleEditModal} className="text-xl absolute right-3">
            <img src={Xicon} alt="닫기버튼" />
          </button>
        </div>
        <form onSubmit={editProfile}>
          <div className="relative w-[100px] mx-auto my-[36px] flex justify-center">
            {!profileImgUrl ? (
              <img
                src={user?.memberImage === null ? Sample : user?.memberImage}
                alt="profile"
                className="w-[80px] h-[80px] rounded-full object-cover border-grayoe-800 border-2"
              />
            ) : (
              <img
                src={profileImgUrl}
                alt="profile"
                className="w-[80px] h-[80px] rounded-full object-cover border-grayoe-800 border-2"
              />
            )}
            <label
              htmlFor="file"
              className="absolute bottom-0 right-2 bg-grayoe-500 border-grayoe-800 border-2 rounded-full p-[3px]"
            >
              <img src={Camera} alt="사진첨부" className="w-4 cursor-pointer" />
              <input
                type="file"
                name="file"
                id="file"
                accept="image/*"
                className="hidden"
                onChange={ChangeImgHandler}
              />
            </label>
          </div>

          <div className="px-6 grid gap-3">
            <div className="mb-4">
              <p className={`text-sm ${newNickname === "" || isNickname ? "text-grayoe-300" : "redoe"}`}>닉네임</p>
              <Input
                value={newNickname}
                onChange={changeNicknameHandler}
                isValid={newNickname === "" || isNickname}
                onClick={resetNicknameValue}
              />
              {isNickname === false && newNickname !== "" ? (
                <p className={`redoe ${visibleLabelClass} ${baseLabelClass}`}>{nicknameMsg}</p>
              ) : (
                <p className={`${hiddenLabelClass} ${baseLabelClass}`}></p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-grayoe-300 text-sm mb-1">이메일</label>
              <p className="text-grayoe-300">{user?.email}</p>
              <hr className="border-grayoe-700 mt-2" />
            </div>

            <div className="items-center">
              <div className="">
                <label className="block text-grayoe-300 text-sm mb-1">비밀번호</label>
                <div className="flex justify-between items-center">
                  <div className="text-grayoe-300">●●●●●●●●</div>
                  <button
                    type="button"
                    onClick={handleNewPasswordModal}
                    className="bg-grayoe-500 hover:bg-grayoe-700 duration-150 text-sm py-1 px-2 rounded font-c2"
                  >
                    비밀번호 변경
                  </button>
                </div>
              </div>
              <hr className="border-grayoe-700 mt-3" />
            </div>
          </div>
          {/* <button type="submit">임시저장버튼</button> */}
        </form>
        <div className="border-b-8 my-5 border-grayoe-900" />
        <div className="flex gap-5 w-full mt-2 text-sm text-grayoe-300 bg-grayoe-950 items-center justify-center font-c2">
          <button onClick={logoutHandler}>로그아웃</button>
          <span>|</span>
          <button>회원탈퇴</button>
        </div>
      </div>
      {isNewPasswordModalOpen &&
        ReactDOM.createPortal(
          <EditPassword
            handleNewPasswordModal={handleNewPasswordModal}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
          />,
          document.body
        )}
    </div>
  );
}

export default EditProfile;
