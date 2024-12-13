import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectRecipe } from "@/types/recipes";
import instance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/zustand/authStore";
import Heart from "@/assets/icons/recipeLike.webp";
import FullHeart from "@/assets/icons/recipeLikeFull.webp";

function RecipeDetail() {
  const { id } = useParams();
  const { user } = useUserStore();
  const [selectRecipe, setSelectRecipe] = useState<selectRecipe>();
  const navigate = useNavigate();

  const body2 = "font-b2-regular text-grayoe-100";

  const fetchLikedDetailData = async () => {
    const res = await instance.get(`/api/recipe/board/like-check/${user?.memberPk}/${id}`);
    return res.data;
  };
  const { data, refetch } = useQuery({
    queryKey: ["likedDetailData"],
    queryFn: fetchLikedDetailData
  });

  const detailLike = data ? data[0].liked : false;

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

  const handleLikeClick = async () => {
    const memberPk = user?.memberPk;
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await instance.post(`/api/recipe/like`, {
        recipePk: id,
        memberPk: memberPk
      });
      refetch();
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  return (
    <section className="xl:w-[864px] mx-auto">
      {selectRecipe && (
        <>
          <div className="relative">
            <img
              src={selectRecipe.recipeImg}
              alt={selectRecipe.title}
              className=" xl:h-[600px] w-full xl:object-cover"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLikeClick();
              }}
              className="absolute right-2 bottom-2"
            >
              <img src={detailLike ? FullHeart : Heart} alt="레시피 좋아요 버튼" className="w-[48px] h-[48px]" />
            </button>
          </div>
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
