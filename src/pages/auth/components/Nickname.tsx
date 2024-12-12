import Input from "@/components/common/Input";
import { StepProps } from "@/types/authPropsTypes";

function Nickname({
  nickname,
  setNickname = () => {},
  isNickname,
  nicknameMsg,
  nicknameChangeHandler = () => {}
}: StepProps) {
  const resetNicknameValue = () => {
    setNickname("");
  };

  return (
    <>
      <div>
        <p className="text-lg mb-4">닉네임을 입력해주세요</p>
        <p
          className={`${!isNickname ? "redoe" : "text-grayoe-300"} ${
            nickname ? "label-visible" : "label-hidden"
          } base-label`}
        >
          닉네임
        </p>
        <Input
          value={nickname}
          maxLength={8}
          onChange={nicknameChangeHandler}
          type="text"
          placeholder="닉네임"
          isValid={isNickname}
          onClick={resetNicknameValue}
        />
        <p
          className={`${"redoe"} ${
            isNickname === false && nickname !== "" ? "label-visible" : "label-hidden"
          } base-label mt-1`}
        >
          {nicknameMsg}
        </p>
      </div>
    </>
  );
}

export default Nickname;
