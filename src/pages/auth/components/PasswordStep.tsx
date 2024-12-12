import PasswordInput from "@/components/common/PasswordInput";
import { StepProps } from "@/types/authPropsTypes";

function PasswordStep({
  password,
  isPassword,
  passwordMsg,
  passwordChangeHandler = () => {},
  confirmPassword,
  isConfirmPassword,
  confirmPasswordMsg,
  confirmPasswordChangeHandler = () => {}
}: StepProps) {
  return (
    <>
      <div className="w-full flex-col flex">
        <div className="flex-grow">
          <p className="text-lg mb-4">비밀번호를 입력해주세요</p>
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
            onChange={passwordChangeHandler}
            type="password"
            placeholder="비밀번호"
            isValid={isPassword}
          />
          <p
            className={`redoe ${isPassword === false && password !== "" ? "label-visible" : "label-hidden"} base-label`}
          >
            {passwordMsg}
          </p>
          <p
            className={`${!isConfirmPassword ? "redoe" : "text-grayoe-300"} ${
              confirmPassword ? "label-visible" : "label-hidden"
            } base-label`}
          >
            비밀번호 재입력
          </p>
          <PasswordInput
            value={confirmPassword}
            minLength={8}
            onChange={confirmPasswordChangeHandler}
            type="password"
            placeholder="비밀번호 재입력"
            isValid={isConfirmPassword}
          />
          <p
            className={`redoe ${
              isConfirmPassword === false && confirmPassword !== "" ? "label-visible" : "label-hidden"
            } base-label`}
          >
            {confirmPasswordMsg}
          </p>
        </div>
      </div>
    </>
  );
}

export default PasswordStep;
