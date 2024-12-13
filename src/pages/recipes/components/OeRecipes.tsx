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
  // const navigate = useNavigate();

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
      console.error("User is not logged in.");
      return;
    }

    // 현재 좋아요 상태 확인
    const isLiked = likedRecipes.includes(recipeId);

    // 상태 업데이트
    const updatedLikedRecipes = isLiked
      ? likedRecipes.filter((id) => id !== recipeId) // 좋아요 취소
      : [...likedRecipes, recipeId];

    setLikedRecipes(updatedLikedRecipes);

    try {
      // 서버에 좋아요 상태 전송
      const res = await instance.post("/api/recipe/board/like-check", {
        memberPk: user?.memberPk,
        recipeList: updatedLikedRecipes
      });

      console.log("좋아요 상태 업데이트 성공:", res.data);
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      // 실패 시 상태 복구 (옵션)
      setLikedRecipes(likedRecipes);
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
                      src={likedRecipes.includes(recipe.id) ? FullHeart : Heart}
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
