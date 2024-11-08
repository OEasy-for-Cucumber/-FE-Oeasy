export type StepType = "이메일" | "비밀번호" | "닉네임" | "가입완료";

export interface StepProps {
  email?: string;
  isEmail?: boolean;
  emailMsg?: string;
  password?: string;
  isPassword?: boolean;
  passwordMsg?: string;
  confirmPassword?: string;
  isConfirmPassword?: boolean;
  confirmPasswordMsg?: string;
  nickname?: string;
  isNickname?: boolean;
  nicknameMsg?: string;
  isCheckedAccept?: boolean;
  setStep: (step: string) => void;
  emailChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  confirmPasswordChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nicknameChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checkedChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface User {
  email: string;
  nickname: string;
  accessToken: string;
  lastVoteTime: number | null;
}
