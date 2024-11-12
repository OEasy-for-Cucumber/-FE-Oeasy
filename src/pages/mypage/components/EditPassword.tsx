import Xicon from "../../../../public/icons/Icon.png";
import Input from "../../../components/common/Input";
import { useState } from "react";

function EditPassword({ closeModal }: { closeModal: () => void }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPasswordMatch && newPassword && isPasswordValid) {
      // 비밀번호 변경 로직 추가
      alert("비밀번호가 성공적으로 변경되었습니다.");
    } else {
      alert("비밀번호가 일치하지 않거나 유효하지 않습니다.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-grayoe-950 text-white w-full max-w-[360px] py-4 relative h-[90vh] mx-4">
        <div className="relative flex justify-center items-center mb-6">
          <h1 className="font-b2-semibold absolute left-1/2 transform -translate-x-1/2">
            비밀번호 변경
          </h1>
          <button onClick={closeModal} className="absolute left-4 top-4">
            <img src={Xicon} alt="닫기" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6">
          <div className="mb-4">
            <Input
              type="password"
              placeholder="새 비밀번호 입력"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            {!isPasswordValid && newPassword && (
              <p className="text-red-500 text-sm mt-1">비밀번호는 최소 8자, 숫자, 특수문자를 포함해야 합니다.</p>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="새 비밀번호 재입력"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {!isPasswordMatch && confirmPassword && (
              <p className="text-red-500 text-sm mt-1">비밀번호가 일치하지 않습니다.</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-grayoe-700 rounded text-grayoe-300"
            disabled={!isPasswordMatch || !newPassword || !confirmPassword || !isPasswordValid}
          >
            완료
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPassword;
