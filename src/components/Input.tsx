interface InputProps {
  type?: "text" | "password" | "number" | "email";
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      className="w-[312px] h-[48px] placeholder-grayoe-400 bg-grayoe-950 outline-none"
      placeholder={placeholder}
    />
  );
};

export default Input;
