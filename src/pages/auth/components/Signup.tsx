import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useActiveStore } from "../../../zustand/isActiveStore";

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

  const navigate = useNavigate();
  const { isActive, setIsActive } = useActiveStore();

  const baseLabelClass = "transition-all duration-300 text-[13px]";
  const visibleLabelClass = "opacity-100 translate-y-0";
  const hiddenLabelClass = "opacity-0 -translate-1";

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

  const confirmChangePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    if (isEmail && isPassword && isConfirmPassword && isNickname && isCheckedAccept) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isEmail, isPassword, isConfirmPassword, isNickname, isCheckedAccept]);

  return (
    <div className="w-full h-svh relative">
      <h1 className="py-4 text-sm text-center">회원가입</h1>
      <div className="text-center my-[40px]">인풋 넘길때 바뀌는 bar</div>
      <form className="grid">
        <p className="text-lg mb-4">이메일을 입력해주세요</p>

        <p
          className={`${!isEmail ? "redoe" : "text-grayoe-300"} ${
            email ? visibleLabelClass : hiddenLabelClass
          } ${baseLabelClass}`}
        >
          이메일
        </p>
        <Input value={email} onChange={emailChangeHandler} type="email" placeholder="이메일" />
        <p
          className={`${"redoe"} ${
            isEmail === false && email !== "" ? visibleLabelClass : hiddenLabelClass
          } ${baseLabelClass}`}
        >
          {emailMsg}
        </p>

        <p
          className={`${!isPassword ? "redoe" : "text-grayoe-300"} ${
            password ? visibleLabelClass : hiddenLabelClass
          } ${baseLabelClass}`}
        >
          비밀번호
        </p>
        <Input value={password} onChange={passwordChangeHandler} type="password" placeholder="비밀번호" />
        <p
          className={`${"redoe"} ${
            isPassword === false && password !== "" ? visibleLabelClass : hiddenLabelClass
          } ${baseLabelClass}`}
        >
          {passwordMsg}
        </p>

        <p
          className={`${!isConfirmPassword ? "redoe" : "text-grayoe-300"} ${
            confirmPassword ? visibleLabelClass : hiddenLabelClass
          } ${baseLabelClass}`}
        >
          비밀번호 재입력
        </p>
        <Input
          value={confirmPassword}
          onChange={confirmChangePasswordHandler}
          type="password"
          placeholder="비밀번호 재입력"
        />
        <p
          className={`${"redoe"} ${
            isConfirmPassword === false && confirmPassword !== "" ? visibleLabelClass : hiddenLabelClass
          } ${baseLabelClass}`}
        >
          {confirmPasswordMsg}
        </p>

        <p
          className={`${!isNickname ? "redoe" : "text-grayoe-300"} ${
            nickname ? visibleLabelClass : hiddenLabelClass
          } ${baseLabelClass}`}
        >
          닉네임
        </p>
        <Input value={nickname} onChange={nicknameChangeHandler} type="text" placeholder="닉네임" />
        <p
          className={`${"redoe"} ${
            isNickname === false && nickname !== "" ? visibleLabelClass : hiddenLabelClass
          } ${baseLabelClass}`}
        >
          {nicknameMsg}
        </p>

        <div className="absolute w-full bottom-6">
          <span className="mx-auto text-sm">
            <input type="checkbox" checked={isCheckedAccept} onChange={checkedChangeHandler} className="mr-2 mb-6" />
            개인정보 수집 및 이용에 대한 동의(필수)
          </span>
          <Button isActive={isActive}>가입완료</Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
