import React from 'react';

interface ButtonProps {
  type?: "button" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  size?: "xs" | "small" | "medium" | "large";
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  type, 
  isActive = true, 
  size,
}) => {
  return (
    <button
      type={type}
      onClick={isActive ? onClick : undefined}
      className={`flex justify-center items-center rounded-md transition-all duration-300 truncate 
        ${isActive ? "bg-[#00C853] opacity-100 hover:bg-[#049140]" : "bg-[#2E2E2E] opacity-60 cursor-not-allowed text-gray-400"} 
        ${size === "small" ? "py-4 px-6" : size === "xs" ? "py-2 px-6" : size === "large" ? "w-full py-4" : "px-[68px] py-4"}`}
      disabled={!isActive}
    >
      {children}
    </button>
  );
};

export default Button;
