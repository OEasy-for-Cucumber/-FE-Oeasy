import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useActiveStore } from "../../../zustand/isActiveStore";

function Login() {
  const [inputValue, setInputValue] = useState("");
  const { isActive, setIsActive} = useActiveStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if(inputValue) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [inputValue]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="w-full p-6 grid gap-4">
      <div className="grid">
        <Input value={inputValue} onChange={handleInputChange} type="email" placeholder="이메일" />
        {/* <Input type="password" placeholder="비밀번호" /> */}
        <Button type="submit" isActive={isActive}>
          로그인
        </Button>
      </div>
    </form>
  );
}

export default Login;
