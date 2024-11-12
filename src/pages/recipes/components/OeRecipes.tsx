// import { useInfiniteQuery } from "@tanstack/react-query";
// import instance from "../../../api/axios";

function OeRecipes() {
  //   const [recipes, setRecipes] = useState([]);

  //   const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  //     queryKey: ["recipes"],
  //     queryFn: async ({ pageParam = 1 }) => {
  //       const res = await instance.get(`api/recipe/board?refId=${100}&view=${10}`);
  //       return res.data;
  //     },
  //     getNextPageParam: (lastPage, pages): number | false => {
  //       const nextPage = pages.length + 1;
  //       return lastPage.length === 0 ? false : nextPage;
  //     },
  //     initialPageParam: 1
  //   });

  return <div>OeRecipes</div>;
}

export default OeRecipes;

// const res = await instance.get(`/api/recipe/board`, {
//     params: {
//       view: 10,
//       page: pageParam
//     }
