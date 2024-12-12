import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Heart from "@/assets/icons/recipeLike.webp";
import FullHeart from "@/assets/icons/recipeLikeFull.webp";
import { useUserStore } from "@/zustand/authStore";
import instance from "@/api/axios";
import Loading from "@/components/common/Loading";
import useRecipesData from "@/hooks/useRecipesData";

function OeRecipes() {
  const { data: recipes, fetchNextPage, hasNextPage, isLoading } = useRecipesData();
  const { user } = useUserStore();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [likedRecipes, setLikedRecipes] = useState<number[]>([]);
  const navigate = useNavigate();

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

  const handleLikeClick = async (recipeId: number) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const isLiked = likedRecipes.push(recipeId);

    const newLikedRecipes = isLiked ? likedRecipes.filter((id) => id !== recipeId) : [...likedRecipes, recipeId];

    console.log(newLikedRecipes);

    try {
      await instance.post("/api/recipe/board/like-check", {
        memberPk: user.memberPk,
        recipeList: !isLiked
      });

      setLikedRecipes(newLikedRecipes);
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {recipes?.pages.map((page) => (
        <div key={page.nowPage} className="grid grid-cols-2 xl:grid-cols-4 gap-4 justify-items-center mb-4">
          {page.list.map((recipe) => (
            <div key={recipe.id}>
              <Link to={`/recipe-detail/${recipe.id}`}>
                <div className="relative">
                  <img
                    src={recipe.imgUrl}
                    alt={recipe.title}
                    className="w-[225px] h-[148px] object-cover rounded relative"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleLikeClick(recipe.id);
                    }}
                    className="absolute right-0 bottom-0"
                  >
                    <img
                      src={likedRecipes ? FullHeart : Heart}
                      alt="레시피 좋아요 버튼"
                      className="w-[48px] h-[48px]"
                    />
                  </button>
                </div>
                <div className="py-2 font-b1-semibold">{recipe.title}</div>
              </Link>
            </div>
          ))}
        </div>
      ))}

      <div ref={loaderRef}></div>
    </>
  );
}

export default OeRecipes;
