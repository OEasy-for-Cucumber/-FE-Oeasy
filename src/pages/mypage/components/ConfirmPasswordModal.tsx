import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import EditPassword from "./EditPassword";
import { useUserStore } from "../../../zustand/authStore";
import instance from "../../../api/axios";
import useAlert from "../../../hooks/useAlert";
import "./modalStyle.css";


export interface ConfirmPasswordModalProp {
  handleNewPasswordModal: () => void;
}

function ConfirmPasswordModal({ handleNewPasswordModal }: ConfirmPasswordModalProp) {
  const [prevPassword, setPrevPassword] = useState<string>("");
  const [newPasswordModalOpen, setNewPasswordModalOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const { showAlert } = useAlert();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsModalVisible(true);
    return () => setIsModalVisible(false);
  }, []);

  const handleCancel = () => {
    handleNewPasswordModal();
  };

  const handlePrevPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrevPassword(e.target.value);
  };

  const handleConfirmPrevPassword = async () => {
    try {
      await instance.post("/login/oeasy", {
        email: user!.email!,
        pw: prevPassword
      });
      setNewPasswordModalOpen(true);
    } catch (error) {
      showAlert({
        message: "인증 실패",
        subMessage: "비밀번호를 다시 확인해주세요."
      });
      return;
    }
  };

  return (
    <div className={`modal ${isModalVisible ? "open" : ""} z-50`}>
      <div className="bg-grayoe-900 text-white rounded-lg p-6 w-[350px] max-w-md">
        <h2 className="text-lg font-bold text-center mb-4">비밀번호 변경</h2>
        <input
          type="password"
          value={prevPassword}
          onChange={handlePrevPasswordChange}
          placeholder="이전 비밀번호를 입력해주세요."
          className="w-full py-1 border-b border-grayoe-400 bg-grayoe-900 placeholder-grayoe-400 focus:outline-none my-8"
        />
        <div className="flex justify-between gap-2 mt-8">
          <Button type="button" onClick={handleCancel} size="medium" isActive={true}>
            취소
          </Button>
          <button
            onClick={handleConfirmPrevPassword}
            className="px-[68px] py-4 bg-grayoe-400 flex justify-center items-center rounded-md transition-all duration-300 truncate opacity-100 hover:opacity-60 bg-[#2E2E2E]cursor-not-allowed"
          >
            확인
          </button>
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
