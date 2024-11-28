import Xicon from "../../../../public/icons/Icon.png";
import Button from "../../../components/common/Button";
import { Dispatch, SetStateAction, useState } from "react";
import PasswordInput from "../../../components/common/PasswordInput";
import { ConfirmPasswordModalProp } from "./ConfirmPasswordModal";
import instance from "../../../api/axios";

interface EditPasswordProp {
  setNewPasswordModalOpen: Dispatch<SetStateAction<boolean>>;
}

function EditPassword({
  setNewPasswordModalOpen,
  handleNewPasswordModal
}: EditPasswordProp & ConfirmPasswordModalProp) {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const baseLabelClass = "transition-all duration-300 text-[13px]";
  const visibleLabelClass = "opacity-100 translate-y-0";
  const hiddenLabelClass = "opacity-0 -translate-1";

  // 비밀번호 유효성 검사 (길이, 특수문자 등)
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
      alert("비밀번호가 성공적으로 변경되었습니다.");
      handleNewPasswordModal();
    } else {
      alert("비밀번호가 일치하지 않거나 유효하지 않습니다.");
    }
  };

  const closeModalHandler = () => {
    setNewPasswordModalOpen(false);
    handleNewPasswordModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-grayoe-950">
      <div className="bg-grayoe-950 text-white w-full min-w-[360px] max-w-[520px] py-4 relative h-svh mx-4 flex flex-col">
        <div className="relative flex justify-center items-center mb-6">
          <h1 className="font-b2-semibold absolute left-1/2 transform -translate-x-1/2 top-3">비밀번호 변경</h1>
          <button type="button" className="absolute left-4 top-3">
            <img src={Xicon} onClick={closeModalHandler} alt="닫기" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-4 mt-[100px] flex flex-col flex-grow">
          <div className="mb-4">
            <PasswordInput
              value={newPassword}
              minLength={8}
              onChange={handleNewPasswordChange}
              type="password"
              placeholder="비밀번호"
              isValid={isPasswordValid}
            />
            <p
              className={`${
                !isPasswordValid && newPassword !== "" ? "text-red-500 " + visibleLabelClass : hiddenLabelClass
              } ${baseLabelClass}`}
            >
              영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.
            </p>

            <PasswordInput
              value={confirmPassword}
              minLength={8}
              onChange={handleConfirmPasswordChange}
              type="password"
              placeholder="비밀번호 재입력"
              isValid={isPasswordMatch}
            />
            <p
              className={`${
                !isPasswordMatch && confirmPassword !== "" ? "text-red-500 " + visibleLabelClass : hiddenLabelClass
              } ${baseLabelClass}`}
            >
              비밀번호가 일치하지 않습니다.
            </p>
          </div>
          <div className="mt-auto mb-2">
            <Button size="large">완료</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPassword;
