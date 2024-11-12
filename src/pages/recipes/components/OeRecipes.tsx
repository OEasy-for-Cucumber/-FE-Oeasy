import { useInfiniteQuery } from "@tanstack/react-query";
import instance from "../../../api/axios";

interface Recipe {
  id: number;
  title: string;
  imgUrl: string;
}

interface RecipeResponse {
  nowPage: number;
  lastPage: number;
  view: number;
  hasNextPage: boolean;
  list: Recipe[];
}

function OeRecipes() {
  const {
    data: recipes,
    // fetchNextPage,
    // hasNextPage,
    // isFetchingNextPage,
    isLoading
  } = useInfiniteQuery<RecipeResponse>({
    queryKey: ["recipes"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await instance.get<RecipeResponse>(`api/recipe/board`, {
        params: {
          view: 10,
          page: pageParam
        }
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nowPage + 1 : undefined;
    },
    initialPageParam: 1
  });
  console.log("데이터", recipes);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {recipes?.pages.map((page) => (
        <div key={page.nowPage} className="grid grid-cols-2 gap-4 place-items-center">
          {page.list.map((recipe) => (
            <div key={recipe.id} className="w-[148px] bg-white rounded-lg">
              <img src={recipe.imgUrl} alt={recipe.title} className="w-[148px] h-[148px] rounded-t-lg" />
              <div className="flex justify-center items-center px-4 py-2 font-b2-semibold text-black text-center">
                {recipe.title}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default OeRecipes;
