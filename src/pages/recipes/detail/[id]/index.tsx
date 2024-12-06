import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../../../api/axios";
import { selectRecipe } from "../../../../types/recipes";

function RecipeDetail() {
  const { id } = useParams();
  const [selectRecipe, setSelectRecipe] = useState<selectRecipe>();

  const body2 = "font-b2-regular text-grayoe-100";

  useEffect(() => {
    const selectRecipeData = async () => {
      try {
        const res = await instance.get(`/api/recipe?id=${id}`);
        setSelectRecipe(res?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    selectRecipeData();
  }, [id]);

  return (
    <section className="xl:w-[864px] mx-auto">
      {selectRecipe && (
        <>
          <img src={selectRecipe.recipeImg} alt={selectRecipe.title} className="h-[360px] xl:h-[520px] w-full " />
          <div className="mx-6 my-[34px]">
            <h5 className="font-h5 mb-2">{selectRecipe.title}</h5>
            <p className="font-b1-regular">{selectRecipe.tip}</p>
          </div>

          <div className="h-2 bg-grayoe-900 mb-6"></div>

          <div className="mx-6 border-b border-grayoe-900 pb-4 mb-4">
            <p className={body2}>재료</p>
            <p>{selectRecipe.ingredients}</p>
          </div>

          <div className="mx-6 mb-6">
            <p className={body2}>조리과정</p>
            <ul>{selectRecipe.manualList?.map((list) => <li key={list.order}>{list.content}</li>)}</ul>
          </div>
        </>
      )}
    </section>
  );
}

export default RecipeDetail;
