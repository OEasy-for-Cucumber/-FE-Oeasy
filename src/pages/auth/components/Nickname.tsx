import Input from "../../../components/common/Input";
import { StepProps } from "../../../types/authPropsTypes";

function Nickname({ nickname, setNickname=()=>{}, isNickname, nicknameMsg, nicknameChangeHandler = () => {} }: StepProps) {
  const baseLabelClass = "transition-all duration-300 text-[13px]";
  const visibleLabelClass = "opacity-100 translate-y-0";
  const hiddenLabelClass = "opacity-0 -translate-1";

  const resetNicknameValue = () => {
    setNickname("");
  }

  return (
    <>
      <div>
        <p className="text-lg mb-4">닉네임을 입력해주세요</p>
        <p
          className={`${!isNickname ? "redoe" : "text-grayoe-300"} ${
            nickname ? visibleLabelClass : hiddenLabelClass
          } ${baseLabelClass}`}
        >
          닉네임
        </p>
        <Input
          value={nickname}
          onChange={nicknameChangeHandler}
          type="text"
          placeholder="닉네임"
          isValid={isNickname}
          onClick={resetNicknameValue}
        />
        <p
          className={`${"redoe"} ${
            isNickname === false && nickname !== "" ? visibleLabelClass : hiddenLabelClass
          } ${baseLabelClass}`}
        >
          {nicknameMsg}
        </p>
      </div>
    </>
  );
}

export default Nickname;
