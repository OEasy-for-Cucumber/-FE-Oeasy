import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import kakaologo from "@/assets/icons/kakaologo.webp";
import Cookies from "js-cookie";
import Logo from "@/assets/icons/logo.webp";
import { AxiosError } from "axios";
import { useUserStore } from "@/zustand/authStore";
import { useActiveStore } from "@/zustand/isActiveStore";
import useAlert from "@/hooks/useAlert";
import instance from "@/api/axios";
import PasswordInput from "@/components/common/PasswordInput";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import LoginBg from "@/assets/img/noisy-gradients.webp";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);

  const [emailMsg, setEmailMsg] = useState<string>("");
  const [passwordMsg, setPasswordMsg] = useState<string>("");

  const { setIsLoggedIn } = useUserStore.getState();
  const { isActive, setIsActive } = useActiveStore();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

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

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await instance.post("/login/oeasy", {
        email,
        pw: password
      });
      Cookies.set("accessToken", response.data.accessToken);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 400) {
          showAlert({
            message: "아이디와 비밀번호를 확인해주세요."
          });
        } else if (error.response.status === 404) {
          showAlert({
            message: "회원정보가 없습니다."
          });
          return;
        }
      } else {
        console.log("Unknown error:", error);
      }
    }
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  const goToHome = () => {
    navigate("/");
  };

  const kakaoLoginHandler = async () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  };

  const resetEmailValue = () => {
    setEmail("");
  };

  return (
    <div className="flex h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] w-full px-6 justify-center">
      <div className="hidden xl:flex items-center justify-center mr-[56px] relative">
        <img src={LoginBg} alt="로그인배경" className="rounded-xl w-full h-auto object-cover" />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-start">
          <h1 className="font-h1 w-[360px] leading-relaxed">전세계 97.24%가 모르는 오이의 진실</h1>
          <h4 className="font-h4 mt-[20px]">- Oeasy</h4>
        </div>
      </div>

      <form onSubmit={loginHandler} className="w-full xl:w-[35%] flex flex-col justify-center">
        <div className="w-full mx-auto xl:w-[312px]">
          <button type="button" onClick={goToHome} className="w-full">
            <img src={Logo} alt="로고" className="w-[160px] mx-auto" />
          </button>
          <div className="grid">
            <p
              className={`${!isEmail ? "redoe" : "text-grayoe-300"} ${
                email ? "label-visible" : "label-hidden"
              } base-label`}
            >
              이메일
            </p>
            <Input
              value={email}
              onChange={emailHandler}
              type="email"
              placeholder="이메일"
              isValid={isEmail}
              onClick={resetEmailValue}
            />
            {isEmail === false && email !== "" && <p className="mt-1 text-[12px] redoe">{emailMsg}</p>}
          </div>

          <div className="grid mb-[32px]">
            <p
              className={`${!isPassword ? "redoe" : "text-grayoe-300"} ${
                password ? "label-visible" : "label-hidden"
              } base-label`}
            >
              비밀번호
            </p>
            <PasswordInput
              value={password}
              minLength={8}
              onChange={passwordHandler}
              type="password"
              placeholder="비밀번호"
              isValid={isPassword}
            />
            {isPassword === false && password !== "" && <p className="mt-1 text-[12px] redoe">{passwordMsg}</p>}
          </div>

          <Button type="submit" isActive={isActive} size="large">
            로그인
          </Button>

          <div className="flex justify-center text-grayoe-300 space-x-6 text-[12px] py-4">
            <button type="button" onClick={goToSignup}>
              회원가입
            </button>
          </div>

          <button
            type="button"
            onClick={kakaoLoginHandler}
            className="flex w-full py-4 justify-center items-center rounded-md bg-[#FEE500] text-[#1C1C1C] font-b1-regular mt-[40px] hover:bg-yellow-500"
          >
            <img src={kakaologo} alt="kakaologo" className="w-[18px] mr-[15px]" />
            카카오 로그인
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
