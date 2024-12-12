import Congratulation from "@/assets/img/congratulation.webp";
import { useUserStore } from "@/zustand/authStore";

function Complete() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="w-full text-center grid justify-center mt-[56px]">
      <img className="w-[147px] mx-auto mt-10" src={Congratulation} alt="환영하는오이" />
      <p className="font-b1-semibold mt-6">{user?.nickname}님</p>
      <h4 className="font-h4">가입을 환영합니다!</h4>
    </div>
  );
}

export default Complete;
