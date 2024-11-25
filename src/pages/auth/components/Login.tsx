import React, { useState, useEffect } from "react";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import { useActiveStore } from "../../../zustand/isActiveStore";
import { useNavigate } from "react-router-dom";
import kakaologo from "../../../../public/icons/kakaologo.png";
import instance from "../../../api/axios";
import { useUserStore } from "../../../zustand/authStore";
import Cookies from "js-cookie";
import PasswordInput from "../../../components/common/PasswordInput";
import Logo from "../../../../public/icons/logo.png";
import { AxiosError } from "axios";

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

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await instance.post("/login/oeasy", {
        email,
        pw: password
      });

      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken);

      setIsLoggedIn(true);
      alert("로그인 성공");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          console.log("아이디와 비밀번호를 확인해 주세요.");
        } else {
          console.log("다른 에러 발생:", error.response.status);
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
    <div className="flex h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] w-full xl:px-[194px] px-4">
      <div className="hidden xl:flex w-1/2 items-center justify-center">
        <div className="w-[600px] h-[500px] bg-noisy_gradients from-green-300 to-blue-500 p-10 rounded-lg m-10 flex items-center justify-center">
          <div className="text-white text-3xl font-bold">
            <h1 className="font-h1 w-[360px] text-center">전세계 97.24%가 모르는 오이의 진실</h1>
            <h4 className="font-h4 mt-[40px]">- Oeasy</h4>
          </div>
        </div>
      </div>

      <form onSubmit={loginHandler} className="w-full xl:w-1/2 flex flex-col justify-center">
        <div className="w-full xl:w-[360px] mx-auto">
          <button type="button" onClick={goToHome} className="w-full">
            <img src={Logo} alt="로고" className="w-[160px] mx-auto" />
          </button>
          <div className="grid mb-[16px]">
            <p
              className={`${!isEmail ? "redoe" : "text-grayoe-300"} ${
                email ? visibleLabelClass : hiddenLabelClass
              } ${baseLabelClass}`}
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
            {isEmail === false && email !== "" && <p className="text-[12px] redoe">{emailMsg}</p>}
          </div>

          <div className="grid mb-[32px]">
            <p
              className={`${!isPassword ? "redoe" : "text-grayoe-300"} ${
                password ? visibleLabelClass : hiddenLabelClass
              } ${baseLabelClass}`}
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
            {isPassword === false && password !== "" && <p className="text-[12px] redoe">{passwordMsg}</p>}
          </div>

          <Button type="submit" isActive={isActive} size="large">
            로그인
          </Button>

          <div className="flex justify-center text-grayoe-300 space-x-6 text-[12px] py-4">
            <button type="button" onClick={goToSignup}>
              회원가입
            </button>
            <button type="button" onClick={goToHome}>
              홈으로
            </button>
          </div>

          <button
            type="button"
            onClick={kakaoLoginHandler}
            className="flex w-full py-4 justify-center items-center rounded-md bg-[#FEE500] text-[#1C1C1C] font-b1-regular mt-[20px] hover:bg-yellow-500"
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
