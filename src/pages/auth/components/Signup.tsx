import { useEffect, useState } from "react";
import EmailStep from "./EmailStep";
import PasswordStep from "./PasswordStep";
import Nickname from "./Nickname";
import Complete from "./Complete";
import ProgressBar from "./ProgressBar";
import { useActiveStore } from "../../../zustand/isActiveStore";
import Button from "../../../components/common/Button";
import { useNavigate } from "react-router-dom";
import FullSquare from "../../../../public/icons/full-Square.png";
import EmptySquare from "../../../../public/icons/empty-Square.png";
import instance from "../../../api/axios";
import { useUserStore } from "../../../zustand/authStore";
import Cookies from "js-cookie";

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(false);
  const [isCheckedAccept, setIsCheckedAccept] = useState<boolean>(false);

  const [emailMsg, setEmailMsg] = useState<string>("");
  const [nicknameMsg, setNicknameMsg] = useState<string>("");
  const [passwordMsg, setPasswordMsg] = useState<string>("");
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState<string>("");

  const { setIsLoggedIn } = useUserStore.getState();
  const [step, setStep] = useState("이메일");
  const { isActive, setIsActive } = useActiveStore();
  const navigate = useNavigate();

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(value);
    if (!regex.test(value)) {
      setEmailMsg("올바른 이메일 형식이 아닙니다.");
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
    setPassword(value);
    if (!regex.test(value)) {
      setPasswordMsg("숫자, 영문, 특수문자를 포함하여 최소 8자를 입력해주세요.");
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  };

  const confirmPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (password === value) {
      setConfirmPasswordMsg("비밀번호가 일치합니다.");
      setIsConfirmPassword(true);
    } else {
      setConfirmPasswordMsg("비밀번호가 일치하지 않습니다.");
      setIsConfirmPassword(false);
    }
  };

  const nicknameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const regex = /^[a-zA-Z0-9가-힣\s]+(?![ㄱ-ㅎㅏ-ㅣ])$/;
    setNickname(e.target.value);
    if (!regex.test(value)) {
      setNicknameMsg("한글,영문,숫자로 최대 8자이내로 지어주세요.");
      setIsNickname(false);
    } else {
      setIsNickname(true);
    }
  };

  const checkedChangeHandler = () => {
    setIsCheckedAccept((prev) => !prev);
  };

  useEffect(() => {
    if (step === "이메일" && isEmail) {
      setIsActive(true);
    } else if (step === "비밀번호" && isPassword && isConfirmPassword) {
      setIsActive(true);
    } else if (step === "닉네임" && isNickname && isCheckedAccept) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [step, isEmail, isPassword, isConfirmPassword, isNickname, isCheckedAccept]);

  const registerHandler = async () => {
    try {
      const response = await instance.post(
        "/member/signup",
        {
          email,
          pw: password,
          nickname,
          memberImage: ""
        },
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        }
      );

      const data = await instance.post("/login/oeasy", {
        email,
        pw: password
      });
      console.log(response);
      
      Cookies.set("accessToken", data.data.accessToken);
      Cookies.set("refreshToken", data.data.refreshToken);

      setIsLoggedIn(true);
      setStep("가입완료");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const nextStepHandler = () => {
    if (isEmail) {
      setStep("비밀번호");
      setIsActive(false);
    }
    if (isPassword && isConfirmPassword) {
      setStep("닉네임");
      setIsActive(false);
    }
  };

  const goToMain = () => {
    navigate("/");
  };

  return (
    <div className="w-full xl:w-[360px] mx-auto h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] flex-col flex px-4">
      <ProgressBar step={step} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step === "닉네임" && isNickname && isCheckedAccept) {
            registerHandler();
          } else {
            nextStepHandler();
          }
        }}
        className="mt-4 flex-grow flex flex-col"
      >
        {step === "이메일" && (
          <EmailStep
            email={email}
            setEmail={setEmail}
            isEmail={isEmail}
            emailMsg={emailMsg}
            emailChangeHandler={emailChangeHandler}
            setStep={setStep}
          />
        )}
        {step === "비밀번호" && (
          <PasswordStep
            password={password}
            setPassword={setPassword}
            isPassword={isPassword}
            passwordMsg={passwordMsg}
            passwordChangeHandler={passwordChangeHandler}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            isConfirmPassword={isConfirmPassword}
            confirmPasswordMsg={confirmPasswordMsg}
            confirmPasswordChangeHandler={confirmPasswordChangeHandler}
            setStep={setStep}
          />
        )}
        {step === "닉네임" && (
          <Nickname
            nickname={nickname}
            setNickname={setNickname}
            isNickname={isNickname}
            nicknameMsg={nicknameMsg}
            nicknameChangeHandler={nicknameChangeHandler}
            checkedChangeHandler={checkedChangeHandler}
            isCheckedAccept={isCheckedAccept}
            setStep={setStep}
          />
        )}
        {step === "가입완료" && <Complete />}
        <div className="w-full mt-auto mb-6">
          {step !== "가입완료" ? (
            step === "닉네임" ? (
              <div className="w-full">
                <p className="mx-auto text-sm flex items-center mb-6">
                  <span onClick={checkedChangeHandler} className="mr-3 mt-1 cursor-pointer">
                    {isCheckedAccept ? (
                      <img src={FullSquare} alt="checked" />
                    ) : (
                      <img src={EmptySquare} alt="unchecked" />
                    )}
                  </span>
                  개인정보 수집 및 이용에 대한 동의(필수)
                </p>
                <Button size="large" type="submit" isActive={isActive}>
                  가입완료
                </Button>
              </div>
            ) : (
              <Button size="large" type="button" onClick={nextStepHandler} isActive={isActive}>
                다음
              </Button>
            )
          ) : (
            <Button size="large" type="button" onClick={goToMain}>
              시작하기
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Signup;
