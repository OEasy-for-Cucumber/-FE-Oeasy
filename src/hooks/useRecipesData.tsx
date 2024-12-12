import instance from "@/api/axios";
import { RecipeResponse } from "@/types/recipes";
import { useInfiniteQuery } from "@tanstack/react-query";

function useRecipesData() {
  return useInfiniteQuery<RecipeResponse>({
    queryKey: ["recipes"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await instance.get<RecipeResponse>(`api/recipe/board`, {
        params: {
          view: 12,
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
}

export default useRecipesData;
