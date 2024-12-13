import Input from "@/components/common/Input";
import { StepProps } from "@/types/authPropsTypes";

function EmailStep({ email, setEmail = () => {}, isEmail, emailMsg, emailChangeHandler = () => {} }: StepProps) {
  const resetEmailValue = () => {
    setEmail("");
  };

  return (
    <div className="w-full">
      <div>
        <p className="text-lg mb-4">이메일을 입력해주세요</p>
        <p
          className={`${!isEmail ? "redoe" : "text-grayoe-300"} ${email ? "label-visible" : "label-hidden"} base-label`}
        >
          이메일
        </p>
        <Input
          value={email}
          onChange={emailChangeHandler}
          type="email"
          placeholder="이메일"
          isValid={isEmail}
          onClick={resetEmailValue}
        />
        <p
          className={`${"redoe"} ${
            isEmail === false && email !== "" ? "label-visible" : "label-hidden"
          } base-label mt-1`}
        >
          {emailMsg}
        </p>
      </div>
    </div>
  );
}

export default EmailStep;
