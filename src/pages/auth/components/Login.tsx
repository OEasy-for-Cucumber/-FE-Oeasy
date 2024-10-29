import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";

function Login() {
  const [inputValue, setInputValue] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    setIsButtonActive(inputValue.trim() !== "");
  }, [inputValue]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isButtonActive) {
      // 로그인 로직 수행 
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full p-6 grid gap-4">
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
        className="border p-2"
        placeholder="아이디를 입력하세요"
      />
      <Button type="submit" isActive={isButtonActive}>로그인</Button>
    </form>
  );
}

export default Login;
