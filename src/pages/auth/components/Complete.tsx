import { useUserStore } from "../../../zustand/authStore"

function Complete() {
  const user = useUserStore((state)=>state.user);
  return (
    <div className="w-full text-center grid">
      <div className="w-[180px] h-[200px] border border-white mx-auto mt-10">이미지</div>
      <p className="font-b1-regular mt-6">{user?.nickname}</p>
      <h4 className="font-h4">가입을 환영합니다!</h4>
    </div>
  )
}

export default Complete