import { useEffect } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { StepProps } from "../../../types/authPropsTypes";
import { useActiveStore } from "../../../zustand/isActiveStore";

function Nickname({
  nickname,
  isNickname,
  nicknameMsg,
  nicknameChangeHandler=()=>{},
  checkedChangeHandler=()=>{},
  isCheckedAccept,
  setStep
}: StepProps) {
  const { isActive, setIsActive } = useActiveStore();

  const baseLabelClass = "transition-all duration-300 text-[13px]";
  const visibleLabelClass = "opacity-100 translate-y-0";
  const hiddenLabelClass = "opacity-0 -translate-1";

  useEffect(()=>{
    if(isNickname && isCheckedAccept) {
      setIsActive(true);
    }
  },[isNickname, isCheckedAccept])

  const nextStep = () => {
    if (isNickname && isCheckedAccept) {
      setStep("가입완료");
      setIsActive(false);
    }
  };

  return (
    <>
      <div>
        <p
          className={`${!isNickname ? "redoe" : "text-grayoe-300"} ${
            nickname ? visibleLabelClass : hiddenLabelClass
          } ${baseLabelClass}`}
        >
          닉네임
        </p>
        <Input value={nickname} onChange={nicknameChangeHandler} type="text" placeholder="닉네임" isValid={isNickname}/>
        <p
          className={`${"redoe"} ${
            isNickname === false && nickname !== "" ? visibleLabelClass : hiddenLabelClass
          } ${baseLabelClass}`}
        >
          {nicknameMsg}
        </p>
      </div>

      <div className="absolute w-full bottom-6">
        <span className="mx-auto text-sm">
          <input type="checkbox" checked={isCheckedAccept} onChange={checkedChangeHandler} className="mr-2 mb-6" />
          개인정보 수집 및 이용에 대한 동의(필수)
        </span>
        <Button onClick={nextStep} isActive={isActive}>
          가입완료
        </Button>
      </div>
    </>
  );
}

export default Nickname;
