import Xicon from "../../../../public/icons/Icon.png";
import Sample from "../../../../public/img/defaultProfile.png";
import Camera from "../../../../public/icons/Camera.png";
import { useUserStore } from "../../../zustand/authStore";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/common/Input";
import { useState } from "react";
import Cookies from "js-cookie";
import instance from "../../../api/axios";
import axios from "axios";
import AccountDeleteModal from "./AccountDeleteModal";
import ConfirmPasswordModal from "./ConfirmPasswordModal";
import { useQueryClient } from "@tanstack/react-query";

function EditProfile({ handleEditModal }: { handleEditModal: () => void }) {
  const { setUser, clearUser, setIsLoggedIn } = useUserStore.getState();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const [newNickname, setNewNickname] = useState<string | undefined>(user!.nickname);

  const [isNickname, setIsNickname] = useState<boolean>(true);
  const [nicknameMsg, setNicknameMsg] = useState<string>("");

  const [profileImg, setProfileImg] = useState<File | null>();
  const [profileImgUrl, setProfileImgUrl] = useState<string>();

  const [isNewPasswordModalOpen, setIsNewPasswordModalOpen] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const queryClinet = useQueryClient();

  const baseLabelClass = "transition-all duration-300 text-[13px]";
  const visibleLabelClass = "opacity-100 translate-y-0";
  const hiddenLabelClass = "opacity-0 -translate-1";

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

  const changeImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setProfileImg(file);
    setProfileImgUrl(URL.createObjectURL(file));
  };

  const editProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedUser = { ...user };
    if (profileImg) {
      try {
        const { data: profileData } = await instance.patch(
          "/member/profile-picture",
          {
            file: profileImg
          },
          {
            headers: { "Content-Type": "multipart/form-data" }
          }
        );
        updatedUser = { ...updatedUser, memberImage: profileData.imageUrl };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
        return;
      }
    }

    if (newNickname && newNickname !== user?.nickname) {
      try {
        if (!newNickname) return;
        const { data: nicknameData } = await instance.patch("/member/nickname", {
          newNickname
        });
        updatedUser = { ...updatedUser, nickname: nicknameData.nickname };
        console.log("닉네임 변경 성공");
      } catch (error) {
        handleNicknameError(error);
        return;
      }
    }

    setUser(updatedUser);
    handleEditModal();
  };

  const handleNicknameError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        alert("닉네임 형식이 올바르지 않습니다. 다시 시도해주세요.");
      } else if (error.response?.status === 409) {
        alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
      } else {
        alert("닉네임 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      alert("알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.");
      console.error("Unexpected error:", error);
    }
  };

  const handleNewPasswordModal = () => {
    if (user?.kakaoId) {
      alert("일반가입 회원만 이용 가능합니다.");
      return;
    }
    setIsNewPasswordModalOpen((prev) => !prev);
  };

  const resetNicknameValue = () => {
    setNewNickname("");
  };

  const logoutHandler = async () => {
    // aioe 연결 끊기
    await instance.delete("/aioe/history");

    Cookies.remove("accessToken");
    if (confirm("로그아웃 하시겠습니까?")) {
      clearUser();
      queryClinet.clear();
      setIsLoggedIn(false);
      navigate("/");
    } else return;
  };

  const AccountDeleteModalHandler = () => {
    setIsDeleteModal((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <form
        onSubmit={editProfile}
        className="bg-grayoe-950 text-white w-full min-w-[360px] max-w-[520px] xl:max-w-none xl:w-[688px] py-4 relative h-svh xl:h-[calc(100vh-120px)]"
      >
        <div className="w-full flex justify-between items-center mt-3 mb-[64px] px-6">
          <button type="button" onClick={handleEditModal} className="text-xl">
            <img src={Xicon} alt="닫기버튼" />
          </button>
          <h1 className="font-b2-semibold">계정 설정</h1>
          <button type="submit" className={`${!isNickname ? "text-grayoe-400" : "text-[#0A84FF]"} text-xs`}>
            저장
          </button>
        </div>
        <div>
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
                onChange={changeImgHandler}
              />
            </label>
          </div>

          <div className="px-6 grid gap-3">
            <div className="mb-4">
              <p className={`text-sm ${newNickname === "" || isNickname ? "text-grayoe-300" : "redoe"}`}>닉네임</p>
              <Input
                value={newNickname}
                maxLength={8}
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
        </div>
        <div className="border-b-8 my-6 border-grayoe-900" />
        <div className="flex gap-5 w-full mt-6 text-sm text-grayoe-300 bg-grayoe-950 items-center justify-center font-c2">
          <button type="button" onClick={logoutHandler}>
            로그아웃
          </button>
          <span>|</span>
          <button type="button" onClick={AccountDeleteModalHandler}>
            회원탈퇴
          </button>
        </div>
      </form>
      {isNewPasswordModalOpen && <ConfirmPasswordModal handleNewPasswordModal={handleNewPasswordModal} />}
      {isDeleteModal && <AccountDeleteModal AccountDeleteModalHandler={AccountDeleteModalHandler} />}
    </div>
  );
}

export default EditProfile;
