import { useUserStore } from "../../../zustand/authStore"
import OeProfile from "../../../../public/img/voteOE2.png";

function Complete() {
  const user = useUserStore((state)=>state.user);
  return (
    <div className="w-full text-center grid">
      <img className="w-[100px] h-auto mx-auto mt-10" 
      src={OeProfile} alt="프로필이미지"/>
      <p className="font-b1-regular mt-6">{user?.nickname}님</p>
      <h4 className="font-h4">가입을 환영합니다!</h4>
    </div>
  )
}

export default Complete