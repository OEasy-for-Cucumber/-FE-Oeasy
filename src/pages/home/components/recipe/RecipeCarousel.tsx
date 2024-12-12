import { useEffect, useState } from "react";
import instance from "../../../../api/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../components/common/Loading";

const RecipeCarousel = () => {
  const [topImage, setTopImage] = useState<string[]>([]);
  const [buttonImage, setButtonImage] = useState<string[]>([]);

  const ulSt = "w-full h-[140px] xl:w-[200px] xl:h-full flex flex-row xl:flex-col gap-4 xl:gap-8";
  const sizeSt = "w-[130px] xl:w-[200px] h-[130px] xl:h-[240px]";

  const fetchRecipeImages = async (): Promise<string[]> => {
    const res = await instance.get("/api/recipe/30");
    return res.data;
  };

  const { data, isLoading, error } = useQuery<string[]>({
    queryKey: ["recipeImages"],
    queryFn: fetchRecipeImages
  });

  useEffect(() => {
    if (data) {
      const middleIndex = Math.ceil(data.length / 2);
      const firstHalf = data.slice(0, middleIndex);
      const secondHalf = data.slice(middleIndex);
      setTopImage(firstHalf);
      setButtonImage(secondHalf);
    }
  }, [data]);

  if (isLoading) {
    return <Loading/>;
  }

  if (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div className="overflow-hidden">
      <div className="h-[285px] xl:h-full xl:w-[425px] flex xl:flex-col">
        <div className="flex flex-col xl:flex-row justify-between">
          <div className="flex animate-move-left xl:animate-move-top">
            <ul className={ulSt}>
              {[...topImage, ...topImage]?.map((top, index) => (
                <li key={index} className={sizeSt}>
                  <img src={top} className={`${sizeSt} rounded-lg xl:rounded-xl`} />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex animate-move-left xl:animate-move-top">
            <ul className={`${ulSt} -translate-x-[75px] xl:translate-x-0 xl:-translate-y-[75px]`}>
              {[...buttonImage, ...buttonImage]?.map((button, index) => (
                <li key={index} className={sizeSt}>
                  <img
                    src={button}
                    className={`${sizeSt} rounded-lg xl:rounded-xl xl:object-cover xl:h-full xl:w-full`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCarousel;
