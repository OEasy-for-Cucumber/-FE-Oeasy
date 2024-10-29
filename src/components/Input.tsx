interface InputProps {
  type?: "text" | "password" | "number" | "email";
  value?: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ type, value, onChange ,placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-[312px] h-[48px] placeholder-grayoe-400 bg-grayoe-950 outline-none"
      placeholder={placeholder}
    />
  );
};

export default Input;
