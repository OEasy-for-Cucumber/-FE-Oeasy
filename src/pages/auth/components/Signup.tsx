import { useState } from "react";
import EmailStep from "./EmailStep";
import PasswordStep from "./PasswordStep";
import Nickname from "./Nickname";
import Complete from "./Complete";
import ProgressBar from "./ProgressBar";

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

  const [step, setStep] = useState("이메일");

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

  const checkedChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedAccept(e.target.checked);
  };

  return (
    <div className="w-full h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)]">
      <ProgressBar step={step}/>
      <form className="mt-4">
        {step === "이메일" && (
          <EmailStep
            email={email}
            isEmail={isEmail}
            emailMsg={emailMsg}
            emailChangeHandler={emailChangeHandler}
            setStep={setStep}
          />
        )}
        {step === "비밀번호" && (
          <PasswordStep
            password={password}
            isPassword={isPassword}
            passwordMsg={passwordMsg}
            passwordChangeHandler={passwordChangeHandler}
            confirmPassword={confirmPassword}
            isConfirmPassword={isConfirmPassword}
            confirmPasswordMsg={confirmPasswordMsg}
            confirmPasswordChangeHandler={confirmPasswordChangeHandler}
            setStep={setStep}
          />)}
        {step === "닉네임" && (
          <Nickname
            nickname={nickname}
            isNickname={isNickname}
            nicknameMsg={nicknameMsg}
            nicknameChangeHandler={nicknameChangeHandler}
            checkedChangeHandler={checkedChangeHandler}
            isCheckedAccept={isCheckedAccept}
            setStep={setStep}
          />
        )}
        {step === "가입완료" && <Complete/>}

      </form>
    </div>
  );
}

export default Signup;
