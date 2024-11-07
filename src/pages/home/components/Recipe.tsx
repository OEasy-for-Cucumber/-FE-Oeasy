import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import RecipeCarousel from "./RecipeCarousel";

function Recipe() {
  const navigator = useNavigate();

  const recipePage = () => {
    navigator("/recipe");
  };

  return (
    <section className="h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] flex flex-col justify-center">
      <div className="font-h3 pl-6">
        Oeasy에서
        <br /> 다양한 오이의
        <br /> 레시피를 만나보세요
      </div>

      <div className="p-6">
        <Button size="small" onClick={recipePage}>
          레시피 바로가기
        </Button>
      </div>
      <RecipeCarousel />
    </section>
  );
}

export default Recipe;
