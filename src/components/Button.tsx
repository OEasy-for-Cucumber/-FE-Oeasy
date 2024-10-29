import React from "react";

interface ButtonProps {
  type?: "button" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type }) => {
  return (
    <button type={type} onClick={onClick} className="">
      {children}
    </button>
  );
};

export default Button;
