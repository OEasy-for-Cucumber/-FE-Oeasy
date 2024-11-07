import Input from "../../../components/common/Input";
import { StepProps } from "../../../types/authPropsTypes";

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
  const baseLabelClass = "transition-all duration-300 text-[13px]";
  const visibleLabelClass = "opacity-100 translate-y-0";
  const hiddenLabelClass = "opacity-0 -translate-1";

  return (
    <>
      <div className="w-full flex-col flex h-[73vh]">
        <div className="flex-grow">
          <p className="text-lg mb-4">비밀번호롤 입력해주세요</p>
          <p
            className={`${!isPassword ? "redoe" : "text-grayoe-300"} ${
              password ? visibleLabelClass : hiddenLabelClass
            } ${baseLabelClass}`}
          >
            비밀번호
          </p>
          <Input
            value={password}
            onChange={passwordChangeHandler}
            type="password"
            placeholder="비밀번호"
            isValid={isPassword}
          />
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
            onChange={confirmPasswordChangeHandler}
            type="password"
            placeholder="비밀번호 재입력"
            isValid={isConfirmPassword}
          />
          <p
            className={`${"redoe"} ${
              isConfirmPassword === false && confirmPassword !== "" ? visibleLabelClass : hiddenLabelClass
            } ${baseLabelClass}`}
          >
            {confirmPasswordMsg}
          </p>
        </div>
      </div>

      {/* <div className="w-full mt-auto">
        <Button size="large" type="button" onClick={nextStepHandler} isActive={isActive}>
          다음
        </Button>
      </div> */}
    </>
  );
}

export default PasswordStep;
