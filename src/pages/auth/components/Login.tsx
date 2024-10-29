import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useActiveStore } from "../../../zustand/isActiveStore";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);

  const [emailMsg, setEmailMsg] = useState<string>("");
  const [passwordMsg, setPasswordMsg] = useState<string>("");

  const { isActive, setIsActive } = useActiveStore();

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(value);
    if (!regex.test(value)) {
      setEmailMsg("올바른 이메일 주소를 입력해주세요.");
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
    setPassword(value);
    if (!regex.test(value)) {
      setPasswordMsg("숫자, 영문, 특수문자를 포함하여 최소 8자리 이상 입력해주세요.");
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  };

  useEffect(() => {
    if (isEmail && isPassword) {
      setIsActive(true);
    } else{
      setIsActive(false);
    } 
  }, [isEmail, isPassword]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="w-full p-6 grid">
      <div className="grid mb-[32px]">
        <div className="grid gap-[10px]">
        <Input value={email} onChange={emailHandler} type="email" placeholder="이메일" />
        {isEmail === false && email !== "" && <p className="text-[12px] pl-2 redoe">{emailMsg}</p>}
        <Input value={password} onChange={passwordHandler} type="password" placeholder="비밀번호" />
        {isPassword === false && password !== "" && <p className="text-[12px] pl-2 redoe">{passwordMsg}</p>}
        </div>
        <Button type="submit" isActive={isActive}>
          로그인
        </Button>
        <div className="flex gap-[24px] mx-auto text-grayoe-300">
          <button>회원가입</button>
          <span>|</span>
          <button>계정찾기</button>
        </div>
      </div>
    </form>
  );
}

export default Login;
