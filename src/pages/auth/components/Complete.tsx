import { useUserStore } from "../../../zustand/authStore"
import Sample from "../../../../public/img/profilesample.jpg"

function Complete() {
  const user = useUserStore((state)=>state.user);
  return (
    <div className="w-full text-center grid">
      <img className="w-[180px] h-[200px] mx-auto mt-10" 
      src={Sample} alt="프로필이미지"/>
      <p className="font-b1-regular mt-6">{user?.nickname}님</p>
      <h4 className="font-h4">가입을 환영합니다!</h4>
    </div>
  )
}

export default Complete