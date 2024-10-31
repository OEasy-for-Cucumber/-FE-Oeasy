interface ProgressBarProps {
  step: string;
}

function ProgressBar({ step }: ProgressBarProps) {
  const getProgress = () => {
    switch (step) {
      case "이메일":
        return 33;
      case "비밀번호":
        return 66;
      case "닉네임":
        return 100;
      default:
        return 0;
    }
  };

  return (
    step === "가입완료" 
    ? null 
    : 
    <div className="w-full px-[96px] py-[32px]">
    <div className="w-full bg-[#EEFFF4] rounded-full h-[4px]">
      <div
        className="bg-green-500 h-[4px] rounded-full transition-all duration-300"
        style={{ width: `${getProgress()}%` }}
      ></div>
    </div>
    </div>
  );
}

export default ProgressBar;
