interface ButtonProps {
  type?: "button" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
  isActive?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type = "button", isActive = true }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex w-full py-4 justify-center items-center rounded-md 
        transition-all duration-300 truncate
        ${isActive ? "bg-[#00C853] opacity-100" : "bg-[#2E2E2E] opacity-60 cursor-not-allowed text-grayoe-400"}`}
      disabled={!isActive}
    >
      {children}
    </button>
  );
};

export default Button;
