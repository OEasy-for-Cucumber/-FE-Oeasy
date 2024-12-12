import Button from "../../../components/common/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PasswordInput from "../../../components/common/PasswordInput";
import { ConfirmPasswordModalProp } from "./ConfirmPasswordModal";
import instance from "../../../api/axios";
import useAlert from "../../../hooks/useAlert";
import LeftArrow from "../../../../public/icons/leftArrow.webp";

interface EditPasswordProp {
  setNewPasswordModalOpen: Dispatch<SetStateAction<boolean>>;
}

function EditPassword({
  setNewPasswordModalOpen,
  handleNewPasswordModal
}: EditPasswordProp & ConfirmPasswordModalProp) {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { showAlert } = useAlert();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsModalVisible(true);
    return () => setIsModalVisible(false);
  }, []);

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setNewPassword(password);
    setIsPasswordValid(validatePassword(password));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setConfirmPassword(password);
    setIsPasswordMatch(password === newPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPasswordMatch && newPassword && isPasswordValid) {
      await instance.patch("/member/password", {
        newPw: newPassword
      });
      showAlert({
        message: "비밀번호가 변경되었습니다."
      });

      handleNewPasswordModal();
    } else {
      showAlert({
        message: "비밀번호가 일치하지 않거나,",
        subMessage: "유효하지 않습니다."
      });
      return;
    }
  };

  const closeModalHandler = () => {
    setNewPasswordModalOpen(false);
    handleNewPasswordModal();
  };

  return (
    <div className={`modal ${isModalVisible ? "open" : ""} z-50`}>

    {/* <div className="fixed inset-0 flex flex-col items-center justify-center z-50 w-full w-full xl:max-w-none h-svh mx-auto xl:bg-black xl:bg-opacity-80 bg-grayoe-950"> */}
      <form onSubmit={handleSubmit} className="bg-grayoe-950 text-white w-full min-w-[360px] max-w-[520px] xl:max-w-none xl:w-[512px] relative h-svh xl:h-[400px] xl:rounded-2xl xl:px-6 xl:py-6 px-6 pb-[40px] flex flex-col">
        <div className="flex items-center py-[18px] xl:pt-2 xl:pb-6 justify-between xl:justify-start mb-[40px] xl:mb-0">
          <button type="button" className="w-[18px] h-[18px] xl:w-[24px] xl:h-[24px] mr-3">
            <img src={LeftArrow} onClick={closeModalHandler} alt="뒤로가기" />
          </button>
          <h1 className="font-b2-semibold xl:font-h4">비밀번호 변경</h1>
          <div className="xl:hidden w-8"></div>
        </div>
          <div className="grid">
            <p
              className={`${!isPasswordValid ? "redoe" : "text-grayoe-300"} ${
                newPassword ? "label-visible" : "label-hidden"
          } base-label`}
            >
              새 비밀번호
            </p>
            <PasswordInput
              value={newPassword}
              minLength={8}
              onChange={handleNewPasswordChange}
              type="password"
              placeholder="새 비밀번호 입력"
              isValid={isPasswordValid}
            />
            {isPasswordValid === false && newPassword !== "" && (
              <p className="mt-1 text-[12px] redoe">
                영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.
              </p>
            )}
          </div>
  
          <div className="grid mb-4">
            <p
              className={`${!isPasswordMatch ? "redoe" : "text-grayoe-300"} ${
                confirmPassword ? "label-visible" : "label-hidden"
          } base-label`}
            >
              새 비밀번호 재입력
            </p>
            <PasswordInput
              value={confirmPassword}
              minLength={8}
              onChange={handleConfirmPasswordChange}
              type="password"
              placeholder="새 비밀번호 재입력"
              isValid={isPasswordMatch}
            />
            {isPasswordMatch === false && confirmPassword !== "" && (
              <p className="mt-1 text-[12px] redoe">비밀번호가 일치하지 않습니다.</p>
            )}
          </div>
  
          <div className="mt-auto xl:mt-auto">
            <Button size="large" isActive={isPasswordMatch}>완료</Button>
          </div>
        </form>
    </div>
  );
   
}

export default EditPassword;
