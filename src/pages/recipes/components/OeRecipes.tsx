import { Link } from "react-router-dom";
import useRecipesData from "../../../hooks/useRecipesData";
import Loading from "../../../components/common/Loading";

function OeRecipes() {
  const { data: recipes, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useRecipesData();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {recipes?.pages.map((page) => (
        <div key={page.nowPage} className="grid grid-cols-2 xl:grid-cols-4 gap-4 justify-items-center mb-4">
          {page.list.map((recipe) => (
            <Link to={`/recipe-detail/${recipe.id}`} key={recipe.id}>
              <img src={recipe.imgUrl} alt={recipe.title} className="w-[225px] h-[148px] object-cover rounded" />
              <div className="py-2 font-b1-semibold">{recipe.title}</div>
            </Link>
          ))}
        </div>
      ))}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full bg-grayoe-600 rounded-lg h-[56px] mb-4"
        >
          {isFetchingNextPage ? "Loading..." : "더보기"}
        </button>
      )}
    </>
  );
}

export default OeRecipes;
