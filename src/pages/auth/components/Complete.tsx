import { useNavigate } from "react-router-dom"
import Button from "../../../components/Button"

function Complete() {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  }

  return (
    <div className="w-full text-center grid">
      <div className="w-[180px] h-[200px] border border-white mx-auto mt-10">이미지</div>
      <p className="font-b1-regular mt-6">떠들썩한아몬드님</p>
      <h4 className="font-h4">가입을 환영합니다!</h4>
      
      <div className="w-full">
        <Button size="large" type="button" onClick={goToMain}>시작하기</Button>
      </div>
    </div>
  )
}

export default Complete