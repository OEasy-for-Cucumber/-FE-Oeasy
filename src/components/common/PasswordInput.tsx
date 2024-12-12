import ShowIcon from "../../../public/icons/ShowPW.webp";
import HideIcon from "../../../public/icons/Hide.webp";
import { useState } from "react";

interface InputProps {
  type?: "text" | "password" | "number" | "email";
  value?: string;
  placeholder?: string;
  minLength?: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isValid?: boolean;
  defaultValue?: string;
  onClick?: () => void;
}

const PasswordInput: React.FC<InputProps> = ({ value, minLength, onChange, placeholder, isValid, defaultValue }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleClicked = () => {
    setIsClicked((prev) => !prev);
  };

  const borderColorClass = isFocused
    ? isValid
      ? "border-[#008CCC]" 
      : "border-[#FF453A]"
    : "border-grayoe-700";

  return (
    <div className="relative">
      <input
        type={!isClicked ? "password" : "text"}
        value={value}
        minLength={minLength}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`focus:outline-none text-[16px] py-2 w-full placeholder-grayoe-400 bg-grayoe-950 outline-none border-b-[1.5px] ${borderColorClass}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {value && isFocused && (
        <button onClick={handleClicked} tabIndex={-1} type="button" className="absolute bottom-4 right-1">
          <img src={!isClicked ? HideIcon : ShowIcon} alt="비밀번호 보기/숨기기 버튼" className="w-4" />
        </button>
      )}
    </div>
  );
};

export default PasswordInput;
