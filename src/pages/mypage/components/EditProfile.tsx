import Xicon from "@/assets/icons/Icon.webp";
import Sample from "@/assets/img/defaultProfile.webp";
import Camera from "@/assets/icons/Camera.webp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AccountDeleteModal from "./AccountDeleteModal";
import ConfirmPasswordModal from "./ConfirmPasswordModal";
import { useQueryClient } from "@tanstack/react-query";
import "./modalStyle.css";
import { useUserStore } from "@/zustand/authStore";
import useAlert from "@/hooks/useAlert";
import useConfirm from "@/hooks/useConfirm";
import instance from "@/api/axios";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

function EditProfile({ handleEditModal }: { handleEditModal: () => void }) {
  const { setUser, clearUser, setIsLoggedIn } = useUserStore.getState();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const [newNickname, setNewNickname] = useState<string | undefined>(user!.nickname);

  const [isNickname, setIsNickname] = useState<boolean>(true);
  const [nicknameMsg, setNicknameMsg] = useState<string>("");
  const [isMatch, setIsMatch] = useState(false);

  const [profileImg, setProfileImg] = useState<File | null>();
  const [profileImgUrl, setProfileImgUrl] = useState<string>();

  const [isNewPasswordModalOpen, setIsNewPasswordModalOpen] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const queryClinet = useQueryClient();
  const { showAlert } = useAlert();
  const { showConfirm } = useConfirm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsModalVisible(true);
    return () => setIsModalVisible(false);
  }, []);

  const changeNicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^[a-zA-Z0-9가-힣\s]+(?![ㄱ-ㅎㅏ-ㅣ])$/;
    setNewNickname(e.target.value);
    if (!regex.test(value)) {
      setNicknameMsg("한글,영문,숫자로 최대 8자이내로 지어주세요.");
      setIsNickname(false);
      setIsMatch(false);
    } else {
      setIsNickname(true);
      setIsMatch(true);
    }
  };

  const changeImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setProfileImg(file);
    setProfileImgUrl(URL.createObjectURL(file));
    setIsMatch(true);
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
        showAlert({
          message: "프로필 이미지가 변경되었습니다."
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 413) {
            showAlert({
              message: "파일 크기는 2MB이하여야 합니다.",
              subMessage: "업로드 가능한 크기 이하로 줄여주세요."
            });
            return;
          } else {
            console.error("Axios 에러:", error.response?.data);
          }
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }

    if (isNickname && newNickname !== user?.nickname) {
      try {
        if (!newNickname) {
          showAlert({
            message: "닉네임을 입력해주세요."
          });
          return;
        }
        const { data: nicknameData } = await instance.patch("/member/nickname", {
          newNickname
        });
        updatedUser = { ...updatedUser, nickname: nicknameData.nickname };
        showAlert({
          message: "프로필이 변경되었습니다."
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            showAlert({
              message: "닉네임 형식이 올바르지 않습니다.",
              subMessage: "다시 시도해주세요."
            });
            return;
          } else if (error.response?.status === 409) {
            showAlert({
              message: "이미 사용중인 닉네임입니다.",
              subMessage: "다른 닉네임으로 변경해주세요."
            });
            return;
          } else {
            showAlert({
              message: "닉네임 변경 중 오류가 발생했습니다.",
              subMessage: "잠시 후 다시 시도해주세요."
            });
          }
          console.error("Axios error:", error.response?.data || error.message);
        } else {
          showAlert({
            message: "예기치 못한 오류가 발생했습니다.",
            subMessage: "다시 시도해주세요."
          });
        }
        return;
      }
    }
    setUser(updatedUser);
    handleEditModal();
  };

  const handleNewPasswordModal = () => {
    if (user?.kakaoId) {
      showAlert({
        message: "카카오 로그인은 이용할 수 없습니다."
      });
      return;
    }
    setIsNewPasswordModalOpen((prev) => !prev);
  };

  const resetNicknameValue = () => {
    setNewNickname("");
  };

  const logoutHandler = async () => {
    showConfirm({
      message: "로그아웃 하시겠습니까?",
      onConfirm: () => {
        clearUser();
        Cookies.remove("accessToken");
        queryClinet.clear();
        setIsLoggedIn(false);
        navigate("/");
        localStorage.removeItem("aiOeMessages");
        instance.delete("/aioe/history");
      }
    });
  };

  const AccountDeleteModalHandler = () => {
    setIsDeleteModal((prev) => !prev);
  };

  return (
    <div className={`modal ${isModalVisible ? "open" : ""}`}>
      <section className="w-full max-w-[520px] xl:max-w-none">
        <form
          onSubmit={editProfile}
          className="bg-grayoe-950 text-white w-full min-w-[360px] max-w-[520px] xl:max-w-none xl:w-[512px] relative h-svh xl:h-auto xl:rounded-2xl xl:px-6 xl:py-6"
        >
          <div className="w-full flex items-center py-4 mb-[64px] xl:m-0 justify-between px-6 xl:px-0">
            <div className="xl:hidden w-8"></div>
            <p className="font-b2-semibold xl:font-h4">계정 설정</p>
            <button type="button" onClick={handleEditModal}>
              <img src={Xicon} alt="닫기버튼" />
            </button>
          </div>
          <div className="px-6 xl:px-0">
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

            <div className="grid gap-3">
              <div className="mb-2">
                <p className={`text-sm ${newNickname === "" || isNickname ? "text-grayoe-300" : "redoe"}`}>닉네임</p>
                <Input
                  value={newNickname}
                  maxLength={8}
                  onChange={changeNicknameHandler}
                  isValid={newNickname === "" || isNickname}
                  onClick={resetNicknameValue}
                />
                {isNickname === false && newNickname !== "" ? (
                  <p className={`redoe label-visible base-label mt-1`}>{nicknameMsg}</p>
                ) : (
                  <p className="base-label label-hidden"></p>
                )}
              </div>

              <div className="mb-2">
                <label className="block text-grayoe-300 text-sm mb-3">이메일</label>
                <p className="text-grayoe-400">{user?.email}</p>
                <hr className="border-grayoe-700 mt-2" />
              </div>

              <div className="items-center">
                <div className="">
                  <label className="block text-grayoe-300 text-sm mb-3">비밀번호</label>
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
          <div className="border-b-8 my-6 border-grayoe-900 xl:hidden" />
          <div className="flex gap-5 w-full text-sm text-grayoe-300 bg-grayoe-950 items-center justify-center font-c2 xl:mt-4">
            <button type="button" onClick={logoutHandler}>
              로그아웃
            </button>
            <span>|</span>
            <button type="button" onClick={AccountDeleteModalHandler}>
              회원탈퇴
            </button>
          </div>
          <div className="mt-10 px-6 xl:px-0">
            <Button type="submit" size="large" isActive={isMatch}>
              저장
            </Button>
          </div>
        </form>
      </section>
      {isNewPasswordModalOpen && <ConfirmPasswordModal handleNewPasswordModal={handleNewPasswordModal} />}
      {isDeleteModal && <AccountDeleteModal AccountDeleteModalHandler={AccountDeleteModalHandler} />}
    </div>
  );
}

export default EditProfile;
