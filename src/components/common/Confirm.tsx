import { useState } from "react";
// import Button from "./Button";

interface ConfirmProps {
  isVisible: boolean;
  message: string;
  subMessage?: string;
  onConfirm: (inputValue?: string) => void;
  onCancel: () => void;
  hasInput?: boolean;
  inputPlaceholder?: string;
  validationText?: string;
}

const Confirm: React.FC<ConfirmProps> = ({
  isVisible,
  message,
  subMessage,
  onConfirm,
  onCancel,
  hasInput = false,
  inputPlaceholder = "",
  validationText = ""
}) => {
  const [inputValue, setInputValue] = useState("");

  if (!isVisible) return null;

  const handleConfirm = () => {
    if (hasInput && validationText && inputValue !== validationText) {
      alert("입력값이 올바르지 않습니다.");
      return;
    }
    onConfirm(hasInput ? inputValue : undefined);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-grayoe-950 bg-opacity-[0.8]">
      <div className="bg-grayoe-900 py-6 px-4 rounded-2xl shadow-lg w-[312px] text-white text-center">
        <p className="font-h5 mb-2">{message}</p>
        {subMessage && <p className="mb-8 font-b2-regular">{subMessage}</p>}

        {hasInput && (
          <div>
            {validationText && <p className="mb-2 font-b1-semibold">{validationText}</p>}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={inputPlaceholder}
              className="w-full py-2 mb-[72px] placeholder-grayoe-400 bg-grayoe-900 outline-none border-b-[1.5px] border-grayoe-700"
            />
          </div>
        )}

        <div className="flex justify-between gap-2">
          <button onClick={onCancel} className="w-[136px] h-[56px] font-b1-semibold bg-grayoe-400 rounded-lg">
            취소
          </button>
          <button onClick={handleConfirm} className="w-[136px] h-[56px] font-b1-semibold bg-greenoe-600 rounded-lg">
            확인
          </button>
          {/* <Button onClick={onCancel} size="medium" isActive={true}>
            취소
          </Button>

          <Button onClick={handleConfirm} size="medium" isActive={true}>
            확인
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Confirm;
