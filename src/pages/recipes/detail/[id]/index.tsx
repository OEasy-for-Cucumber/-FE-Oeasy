import { useParams } from "react-router-dom";
import useRecipesData from "../../../../hooks/useRecipesData";
import { useEffect, useState } from "react";

function RecipeDetail() {
  const { id } = useParams();
  const { data: recipes } = useRecipesData();
  const [storedRecipe, setStoredRecipe] = useState(null);

  const recipe = recipes?.pages.flatMap((page) => page.list).find((recipe) => String(recipe.id) == id);

  useEffect(() => {
    if (recipe) {
      localStorage.setItem("recipeDetail", JSON.stringify(recipe));
    }
  }, [recipe]);

  useEffect(() => {
    const savedRecipe = localStorage.getItem("recipeDetail");
    if (savedRecipe) {
      setStoredRecipe(JSON.parse(savedRecipe));
    }
  }, []);

  return (
    <section>
      <div></div>
    </section>
  );
}

export default RecipeDetail;
