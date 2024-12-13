import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Heart from "@/assets/icons/recipeLike.webp";
import FullHeart from "@/assets/icons/recipeLikeFull.webp";
import { useUserStore } from "@/zustand/authStore";
import instance from "@/api/axios";
import Loading from "@/components/common/Loading";
import useRecipesData from "@/hooks/useRecipesData";
import useAlert from "@/hooks/useAlert";

interface LikeType {
  recipePk: number;
  liked: boolean;
}

function OeRecipes() {
  const { data: recipes, fetchNextPage, hasNextPage, isLoading } = useRecipesData();
  const { user } = useUserStore();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [likedRecipesMap, setLikedRecipesMap] = useState<Record<number, boolean>>({});
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const page = recipes?.pageParams.length || 0;
      const index = page - 1;
      const likeRecipes = recipes?.pages[index]?.list?.map((list) => list.id) || [];
      const memberPk = user?.memberPk;
      const recipeList = likeRecipes;

      try {
        const res = await instance.get(`api/recipe/board/like-check/${memberPk}/${recipeList}`);

        setLikedRecipesMap((prev) => ({
          ...prev,
          ...res.data.reduce((acc: Record<number, boolean>, curr: LikeType) => {
            acc[curr.recipePk] = curr.liked;
            return acc;
          }, {})
        }));
      } catch (error) {
        console.error("좋아요 상태 확인 실패:", error);
      }
    };

    if (user && recipes) {
      fetchLikeStatus();
    }
  }, [recipes, user]);

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

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const handleLikeClick = async (recipeId: number) => {
    const memberPk = user?.memberPk;
    if (!user) {
      showAlert({
        message: "로그인 후 이용해주세요"
      });
      navigate("/login");
      return;
    }

    try {
      await instance.post(`/api/recipe/like`, {
        recipePk: recipeId,
        memberPk: memberPk
      });

      setLikedRecipesMap((prev) => ({
        ...prev,
        [recipeId]: !prev[recipeId]
      }));
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
          {page.list.map((recipe) => {
            const isLiked = likedRecipesMap[recipe.id] || false;
            return (
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
                      <img src={isLiked ? FullHeart : Heart} alt="레시피 좋아요 버튼" className="w-[48px] h-[48px]" />
                    </button>
                  </div>
                  <div className="py-2 font-b1-semibold">{recipe.title}</div>
                </Link>
              </div>
            );
          })}
        </div>
      ))}
      {!isLoading && <div ref={loaderRef}></div>}
    </>
  );
}

export default OeRecipes;
