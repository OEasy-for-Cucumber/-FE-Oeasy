import React, { useState } from "react";
import Button from '../../../components/common/Button';
import instance from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUserStore } from "../../../zustand/authStore";
import useAlert from "../../../hooks/useAlert";

interface AccountDeleteModalProps {
  AccountDeleteModalHandler: () => void;
}

const AccountDeleteModal: React.FC<AccountDeleteModalProps> = ({
  AccountDeleteModalHandler,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const { setIsLoggedIn } = useUserStore.getState();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const targetPhrase = "오이,, 오이오이오이? 오이.. 오이 ㅠㅠ";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === targetPhrase) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  };

  const handleCancel = () => {
    AccountDeleteModalHandler();
  };

  const handleDelete = async () => {
    if(!isMatch) {
      showAlert({
        message: "탈퇴 문구와 일치하지 않습니다."
      })
      return;
    }
    if (isMatch) {
      try {
        await instance.delete("/member/delete", {
          data: {
            confirmationMessage: inputValue,
          },
        });
        
        showAlert({
          message:"계정이 탈퇴되었습니다."
        });
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setIsLoggedIn(false);
        navigate("/");
      } catch (error) {
        console.error(error);
        alert("탈퇴 요청 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("탈퇴 문구가 일치하지 않습니다.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-grayoe-950 bg-opacity-80">
      <div className="bg-grayoe-900 text-white rounded-lg p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-bold text-center mb-4">정말 떠나실 건가요?</h2>
        <p className="text-sm text-center mb-6">
          탈퇴 시 아래 문구를 똑같이 입력해주세요
        </p>
        <div className="text-center mb-4 font-bold text-lg">{targetPhrase}</div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="탈퇴문구 입력"
          className="w-full p-2 border-b border-grayoe-400 bg-grayoe-900 placeholder-grayoe-400 focus:outline-none"
        />
        <div className="flex justify-between gap-2 mt-[72px]">
          <Button
            onClick={handleCancel}
            size="medium"
            isActive={true}
          >
            계정유지
          </Button>
          <button
            onClick={handleDelete}
            className={`px-[68px] py-4 bg-grayoe-400 flex justify-center items-center rounded-md transition-all duration-300 truncate  ${isMatch ? "opacity-100" : "hover:opacity-60 bg-[#2E2E2E]cursor-not-allowed"} `}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDeleteModal;
