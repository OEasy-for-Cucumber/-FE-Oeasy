import { useState } from "react";
import DeleteIcon from "../../../public/icons/deleteIcon.webp";

interface InputProps {
  type?: "text" | "password" | "number" | "email";
  value?: string;
  maxLength?: number;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isValid?: boolean;
  defaultValue?: string;
  onClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  maxLength,
  onChange,
  placeholder,
  isValid,
  defaultValue,
  onClick,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const borderColorClass = isFocused
  ? isValid
    ? "border-[#008CCC]"
    : "border-[#FF453A]"
  : "border-grayoe-700";


  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`focus:outline-none w-full h-[48px] placeholder-grayoe-400 bg-grayoe-950 outline-none border-b-[1.5px] ${borderColorClass}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />

      {isFocused && value && (
        <button
          onClick={onClick}
          tabIndex={-1}
          type="reset"
          className="absolute bottom-4 right-1"
        >
          <img src={DeleteIcon} alt="삭제버튼" className="w-4" />
        </button>
      )}
    </div>
  );
};

export default Input;
