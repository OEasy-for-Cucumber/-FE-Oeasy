import Input from "../../../components/common/Input";
import { StepProps } from "../../../types/authPropsTypes";

function EmailStep({ email, setEmail = () => {}, isEmail, emailMsg, emailChangeHandler = () => {} }: StepProps) {
  const baseLabelClass = "transition-all duration-300 text-[13px]";
  const visibleLabelClass = "opacity-100 translate-y-0";
  const hiddenLabelClass = "opacity-0 -translate-1";

  const resetEmailValue = () => {
    setEmail("");
  }

  return (
    <>
      <div className="w-full">
        <div className="">
          <p className="text-lg mb-4">이메일을 입력해주세요</p>
          <p
            className={`${!isEmail ? "redoe" : "text-grayoe-300"} ${
              email ? visibleLabelClass : hiddenLabelClass
            } ${baseLabelClass}`}
          >
            이메일
          </p>
          <Input value={email} onChange={emailChangeHandler} type="email" placeholder="이메일" isValid={isEmail} onClick={resetEmailValue}/>
          <p
            className={`${"redoe"} ${
              isEmail === false && email !== "" ? visibleLabelClass : hiddenLabelClass
            } ${baseLabelClass}`}
          >
            {emailMsg}
          </p>
        </div>
      </div>
    </>
  );
}

export default EmailStep;
