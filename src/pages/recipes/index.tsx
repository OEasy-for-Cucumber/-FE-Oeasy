import { useNavigate } from "react-router-dom";
import OeRecipes from "./components/OeRecipes";
import Hat from "@/assets/img/hat.webp";
import Heart from "@/assets/img/recipe_heart.webp";
import ArrowRight from "@/assets/icons/rightArrow.webp";
import instance from "@/api/axios";
import { useUserStore } from "@/zustand/authStore";
import useAlert from "@/hooks/useAlert";

function Recipes() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { showAlert } = useAlert();

  const randomRecipeBtn = async () => {
    const res = await instance("/api/recipe/random");
    const randomCount = res?.data;
    navigate(`/recipe-detail/${randomCount}`);
  };

  return (
    <section className="px-6 xl:px-0 xl:w-[864px] xl:mx-auto">
      <div className="my-[24px] xl:flex xl:gap-4">
        <button onClick={randomRecipeBtn} className="w-full border border-greenoe-800 py-[16px] pl-[24px] mb-4 xl:m-0 rounded-lg relative flex flex-col">
          <h5 className="font-h5 mb-2">오이로 뭐 해먹지?</h5>
          <div
            
            className="items-center w-[125px] h-[20px] px-2 py-[2px] bg-greenoe-800 rounded-full font-c2 flex truncate gap-1"
          >
            오늘 요리 추천 받기
            <img src={ArrowRight} alt="랜덤버튼" className="w-[14px] h-[14px]" />
          </div>

          <img
            src={Hat}
            alt="랜덤레시피 버튼 이미지"
            className="w-[62px] h-[68px] xl:w-[67px] xl:h-[73px] absolute right-[23px] xl:right-[30px] top-[11px] xl:top-[9px]"
          />
        </button>

        <button 
        onClick={() => {
          if (!user) {
            showAlert({
              message: "로그인 후 이용해주세요"
            });
            navigate("/login");
            return;
          }
          navigate("/like-recipes");
        }}
        className="w-full border border-greenoe-800 py-[16px] pl-[24px] rounded-lg relative flex flex-col">
          <h5 className="font-h5 mb-2">나 오이 좋아하네</h5>
          <div
            
            className="items-center w-[132px] h-[20px] px-2 py-[2px] bg-greenoe-800 rounded-full font-c2 flex truncate gap-1"
          >
            내가 좋아요한 레시피
            <img src={ArrowRight} alt="랜덤버튼" className="w-[14px] h-[14px]" />
          </div>

          <img
            src={Heart}
            alt="랜덤레시피 버튼 이미지"
            className="w-[63px] h-[60px] xl:w-[68px] xl:h-[65px] absolute right-[23px] xl:right-[30px] top-[15px] xl:top-[13px]"
          />
        </button>
      </div>

      <OeRecipes />
    </section>
  );
}

export default Recipes;
