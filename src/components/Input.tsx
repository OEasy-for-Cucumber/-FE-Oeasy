interface InputProps {
  type?: "text" | "password" | "number" | "email";
  value?: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full h-[48px] placeholder-grayoe-400 bg-grayoe-950 outline-none border-b-[1.5px] border-grayoe-700"
      placeholder={placeholder}
    />
  );
};

export default Input;
