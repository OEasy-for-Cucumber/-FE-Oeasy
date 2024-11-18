import ShowIcon from "../../../public/icons/ShowPW.png";
import HideIcon from "../../../public/icons/Hide.png";
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
  const borderColorClass = value === "" ? "border-grayoe-700" : isValid ? "border-[#008CCC]" : "border-[#FF453A]";

    const handleClicked = () => {
        setIsClicked((prev)=>!prev);
    }

  return (
    <div className="relative">
      <input
        type={!isClicked ? "password" : "text"}
        value={value}
        minLength={minLength}
        onChange={onChange}
        className={`w-full h-[48px] placeholder-grayoe-400 bg-grayoe-950 outline-none border-b-[1.5px] ${borderColorClass}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {value && (
        <button onClick={handleClicked} tabIndex={-1} type="reset" className="absolute bottom-4 right-1">
          <img src={!isClicked ? HideIcon : ShowIcon} alt="블라인드버튼" className="w-4" />
        </button>
      )}
    </div>
  );
};

export default PasswordInput;
