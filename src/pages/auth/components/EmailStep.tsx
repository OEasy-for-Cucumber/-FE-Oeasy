import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { StepProps } from "../../../types/authPropsTypes";
import { useActiveStore } from "../../../zustand/isActiveStore";
import { useEffect } from "react";

function EmailStep({ email, isEmail, emailMsg, setStep, emailChangeHandler = () => {} }: StepProps) {
  const { isActive, setIsActive } = useActiveStore();

  const baseLabelClass = "transition-all duration-300 text-[13px]";
  const visibleLabelClass = "opacity-100 translate-y-0";
  const hiddenLabelClass = "opacity-0 -translate-1";

  useEffect(() => {
    if (isEmail) {
      setIsActive(true);
    }
  }, [isEmail]);

  const nextStepHandler = () => {
    if (isEmail) {
      setStep("비밀번호");
      setIsActive(false);
    }
  };

  return (
    <>
      <div className="w-full relative">
        <p className="text-lg mb-4">이메일을 입력해주세요</p>
        <p
          className={`${!isEmail ? "redoe" : "text-grayoe-300"} ${
            email ? visibleLabelClass : hiddenLabelClass
          } ${baseLabelClass}`}
        >
          이메일
        </p>
        <Input value={email} onChange={emailChangeHandler} type="email" placeholder="이메일" isValid={isEmail}/>
        <p
          className={`${"redoe"} ${
            isEmail === false && email !== "" ? visibleLabelClass : hiddenLabelClass
          } ${baseLabelClass}`}
        >
          {emailMsg}
        </p>
      </div>
      <div className="w-full absolute bottom-6">
        <Button size="large" type="button" onClick={nextStepHandler} isActive={isActive}>
          다음
        </Button>
      </div>
    </>
  );
}

export default EmailStep;
