import { Link } from "react-router-dom";
import useInfiniteRecipes from "../../../hooks/useInfiniteRecipes";

function OeRecipes() {
  const { data: recipes, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteRecipes();

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {recipes?.pages.map((page) => (
        <div key={page.nowPage} className="grid grid-cols-2 gap-4 place-items-center">
          {page.list.map((recipe) => (
            <Link to={`/recipe-detail/${recipe.id}`}>
              <div key={recipe.id} className="w-[148px] bg-white rounded-lg">
                <img src={recipe.imgUrl} alt={recipe.title} className="w-[148px] h-[148px] rounded-t-lg" />
                <div className="flex justify-center items-center px-4 py-2 font-b2-semibold text-black text-center">
                  {recipe.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ))}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full bg-grayoe-600 rounded-lg h-[56px] my-4"
        >
          {isFetchingNextPage ? "Loading..." : "더보기"}
        </button>
      )}
    </>
  );
}

export default OeRecipes;
