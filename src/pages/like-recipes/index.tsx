import instance from "@/api/axios";
import { Recipe } from "@/types/recipes";
import { useUserStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function LikeRecipes() {
  const { user } = useUserStore();

  const fetchLikedData = async (): Promise<Recipe[]> => {
    const res = await instance.get(`/api/recipe/board/${user?.memberPk}`);
    return res.data;
  };
  const { data: recipes } = useQuery<Recipe[]>({
    queryKey: ["likedRecipes"],
    queryFn: fetchLikedData
  });
  const reversedRecipes = recipes ? [...recipes].reverse() : [];

  return (
    <section className="px-6 xl:px-0 xl:w-[864px] h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] mt-[24px] xl:mx-auto">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 justify-items-center mb-4">
        {reversedRecipes?.map((like, index) => (
          <Link to={`/recipe-detail/${like.id}`} key={index}>
            <div className="relative">
              <img src={like.imgUrl} alt={like.title} className="w-[225px] h-[148px] object-cover rounded relative" />
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="absolute right-0 bottom-0"
              ></button>
            </div>
            <div className="py-2 font-b1-semibold">{like.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default LikeRecipes;
