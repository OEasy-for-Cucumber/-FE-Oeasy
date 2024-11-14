interface InputProps {
  type?: "text" | "password" | "number" | "email";
  value?: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isValid?: boolean;
  defaultValue?: string;
}

const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder, isValid, defaultValue }) => {
  const borderColorClass = value === "" ? "border-grayoe-700" : isValid ? "border-[#008CCC]" : "border-[#FF453A]";
  
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full h-[48px] placeholder-grayoe-400 bg-grayoe-950 outline-none border-b-[1.5px] ${borderColorClass}`}

      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
};

export default Input; 