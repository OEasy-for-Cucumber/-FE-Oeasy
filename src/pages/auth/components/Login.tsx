import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useActiveStore } from "../../../zustand/isActiveStore";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);

  const [emailMsg, setEmailMsg] = useState<string>("");
  const [passwordMsg, setPasswordMsg] = useState<string>("");

  const { isActive, setIsActive } = useActiveStore();
  const navigate = useNavigate();

  const baseLabelClass = "transition-all duration-300 text-[13px]";
  const visibleLabelClass = "opacity-100 translate-y-0";
  const hiddenLabelClass = "opacity-0 -translate-1";

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
    } else {
      setIsActive(false);
    }
  }, [isEmail, isPassword]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const goToSignup = () => {
    navigate("/signup")
  }

  return (
    <form onSubmit={onSubmit} className="w-full grid">
      <div className="mt-[150px] grid">
        <div className="grid mb-[32px]">
          <p
            className={`${!isEmail ? "redoe" : "text-grayoe-300"} ${
              email ? visibleLabelClass : hiddenLabelClass
            } ${baseLabelClass}`}
          >
            이메일
          </p>
          <Input value={email} onChange={emailHandler} type="email" placeholder="이메일"
          isValid={isEmail} />
          {isEmail === false && email !== "" && <p className={"text-[12px] redoe"}>{emailMsg}</p>}
  
          <p
            className={`${!isPassword ? "redoe" : "text-grayoe-300"} ${
              password ? visibleLabelClass : hiddenLabelClass
            } ${baseLabelClass} mt-2`}
          >
            비밀번호
          </p>
          <Input value={password} onChange={passwordHandler} type="password" placeholder="비밀번호" isValid={isPassword}/>
          {isPassword === false && password !== "" && <p className={"text-[12px] redoe"}>{passwordMsg}</p>}
        </div>
  
        <Button type="submit" isActive={isActive}>
          로그인
        </Button>
  
        <div className="flex mx-auto text-grayoe-300 items-center space-x-6 text-[12px] py-4">
          <button onClick={goToSignup}>회원가입</button>
          <p>|</p>
          <button>계정찾기</button>
        </div>
      </div>
    </form>
  );
}

export default Login;