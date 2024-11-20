import React, { useState } from "react";
import { useActiveStore } from "../../../zustand/isActiveStore";
import Button from '../../../components/common/Button';
import instance from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


interface AccountDeleteModalProps {
    AccountDeleteModalHandler: () => void;
  }

  const AccountDeleteModal: React.FC<AccountDeleteModalProps> = ({
    AccountDeleteModalHandler,
  }) => {
  const [inputValue, setInputValue] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const {isActive, setIsActive} = useActiveStore.getState();

  const navigate = useNavigate();

  const targetPhrase = "오이,, 오이오이오이? 오이.. 오이 ㅠㅠ";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if(e.target.value === targetPhrase) {
        setIsMatch(true);
        setIsActive(true);
    }
    if(inputValue === "" && !isMatch) {
        setIsActive(false);
    }
  };

  const handleCancel = () => {
    AccountDeleteModalHandler();
  };

  const handleDelete = async () => {
    if (isMatch) {
      try {
        const data = await instance.delete("/member/delete", {
          data: {
            confirmationMessage: inputValue,
          },
        });
        console.log(data);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        document.cookie.split(";").forEach((cookie) => {
            const cookieName = cookie.split("=")[0].trim();
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          });


        alert("계정이 탈퇴되었습니다.");
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
          className="w-full p-2 border-b border-grayoe-400 bg-grayoe-900 focus:outline-none focus:ring-2 focus:ring-green-500 mb-6"
        />
        <div className="flex justify-between gap-3">
          {/* <button
            onClick={handleCancel}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            계정유지
          </button> */}
          <Button 
          onClick={handleCancel}
          size="medium"
          isActive={true}>
            계정유지</Button>
          {/* <button
            onClick={handleDelete}
            className={`px-4 py-2 rounded-md ${
              isMatch
                ? "bg-gray-500 text-white hover:bg-gray-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isMatch}
          >
            회원탈퇴
          </button> */}
          <Button
          onClick={handleDelete}
          size="medium"
          isActive={isActive}
          >회원탈퇴</Button>
        </div>
      </div>
    </div>
  );
};

export default AccountDeleteModal;
