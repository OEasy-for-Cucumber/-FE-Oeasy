import { Link } from "react-router-dom";
import useRecipesData from "../../../hooks/useRecipesData";
import Loading from "../../../components/common/Loading";
import { useEffect, useRef } from "react";

function OeRecipes() {
  const { data: recipes, fetchNextPage, hasNextPage, isLoading } = useRecipesData();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "100px", threshold: 0 }
    );

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect(); // 메모리 누수 방지
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Loading className="w-[180px] xl:w-[300px]" />
      </div>
    );
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

      <div ref={loaderRef} className="w-full h-[56px] flex items-center justify-center mb-4"></div>
    </>
  );
}

export default OeRecipes;
