export type StepType = "이메일" | "비밀번호" | "닉네임" | "가입완료";

export interface StepProps {
  email?: string;
  setEmail?:(email:string) => void;
  isEmail?: boolean;
  emailMsg?: string;
  password?: string;
  setPassword?:(password:string) => void;
  isPassword?: boolean;
  passwordMsg?: string;
  confirmPassword?: string;
  setConfirmPassword?:(confirmPassword:string) => void;
  isConfirmPassword?: boolean;
  confirmPasswordMsg?: string;
  nickname?: string;
  setNickname?:(nickname:string) => void;
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
  memberPk: number;
  email: string;
  nickname: string;
  accessToken?: string;
  refreshToken?: string;
  lastVoteTime?: number | null;
  memberImage? :string | null;
}
