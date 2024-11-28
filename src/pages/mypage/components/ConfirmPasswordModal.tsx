import { useState } from "react";
import Button from "../../../components/common/Button";
import { useActiveStore } from "../../../zustand/isActiveStore";
import EditPassword from "./EditPassword";
import { useUserStore } from "../../../zustand/authStore";
import instance from "../../../api/axios";

export interface ConfirmPasswordModalProp {
  handleNewPasswordModal: () => void;
}

function ConfirmPasswordModal({ handleNewPasswordModal }: ConfirmPasswordModalProp) {
  const [prevPassword, setPrevPassword] = useState<string>("");
  const { isActive, setIsActive } = useActiveStore.getState();
  const [newPasswordModalOpen, setNewPasswordModalOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  useState(() => {
    setIsActive(false);
  });
  
  const handleCancel = () => {
    handleNewPasswordModal();
    setIsActive(false);
  };

  const handlePrevPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrevPassword(e.target.value);
    if (prevPassword !== "") {
      setIsActive(true);
    }
  };

  const handleConfirmPrevPassword = async () => {
    await instance.post("/login/oeasy", {
      email: user!.email!, pw: prevPassword
    })
    console.log("인증완료");
    setNewPasswordModalOpen(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-grayoe-950 bg-opacity-80">
      <div className="bg-grayoe-900 text-white rounded-lg p-6 w-[350px] max-w-md">
        <h2 className="text-lg font-bold text-center mb-4">비밀번호 변경</h2>
        <input
          type="password"
          value={prevPassword}
          onChange={handlePrevPasswordChange}
          placeholder="이전 비밀번호를 입력해주세요."
          className="w-full p-2 border-b border-grayoe-400 bg-grayoe-900 focus:outline-none focus:ring-2 focus:ring-green-500 mb-6"
        />
        <div className="flex justify-between gap-3">
          <Button type="button" onClick={handleCancel} size="medium" isActive={true}>
            취소
          </Button>
          <Button type="button" onClick={handleConfirmPrevPassword} size="medium" isActive={isActive}>
            확인
          </Button>
        </div>
      </div>
      {newPasswordModalOpen && (
        <EditPassword
          setNewPasswordModalOpen={setNewPasswordModalOpen}
          handleNewPasswordModal={handleNewPasswordModal}
        />
      )}
    </div>
  );
}

export default ConfirmPasswordModal;
