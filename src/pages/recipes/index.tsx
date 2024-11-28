import { useNavigate } from "react-router-dom";
import OeRecipes from "./components/OeRecipes";
import instance from "../../api/axios";

function Recipes() {
  const navigate = useNavigate();

  const randomRecipeBtn = async () => {
    const res = await instance("/api/recipe/random");
    const randomCount = res?.data;
    navigate(`/recipe-detail/${randomCount}`);
  };

  return (
    <section className="px-6 xl:px-0 xl:w-[688px] xl:mx-auto">
      <button
        className="w-full border px-[24px] py-[16px] my-[24px] rounded-lg border-greenoe-600 bg-greenoe-50 bg-recipes_btn_bg bg-no-repeat bg-right bg-contain text-black text-left"
        onClick={randomRecipeBtn}
      >
        <div className="text-sm xl:text-base">Oeasy픽</div>
        <div className="font-h5 xl:text-2xl">
          오늘의 <span className="text-greenoe-600">오이요리</span> 추천 받기
        </div>
      </button>

      <OeRecipes />
    </section>
  );
}

export default Recipes;
