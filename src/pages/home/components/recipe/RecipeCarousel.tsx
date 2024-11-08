import { useEffect, useState } from "react";
import instance from "../../../../api/axios";

function RecipeCarousel() {
  const [topImage, setTopImage] = useState<string[]>([]);
  const [buttonImage, setButtonImage] = useState<string[]>([]);

  const ulSt = "w-full h-[140px] xl:w-[200px] xl:h-full flex flex-row xl:flex-col gap-4";
  const sizeSt = "w-[130px] xl:w-[200px] h-[130px] xl:h-[240px]";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/api/recipe/30");
        const images = res?.data;
        const middleIndex = Math.ceil(images.length / 2);
        const firstHalf = images.slice(0, middleIndex);
        const secondHalf = images.slice(middleIndex);
        setTopImage(firstHalf);
        console.log(topImage);
        setButtonImage(secondHalf);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="overflow-hidden">
      <div className="h-[285px] xl:h-full xl:w-[450px] flex xl:flex-col">
        <div className="flex flex-col xl:flex-row justify-between">
          <div className="flex pr-4 animate-move-left xl:animate-move-top">
            <ul className={ulSt}>
              {[...topImage, ...topImage]?.map((top, index) => (
                <li key={index} className={sizeSt}>
                  <img src={top} className={`${sizeSt} rounded-lg`} />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex pr-4 animate-move-left xl:animate-move-top">
            <ul className={`${ulSt} -translate-y-[75px]`}>
              {[...buttonImage, ...buttonImage]?.map((button, index) => (
                <li key={index} className={sizeSt}>
                  <img src={button} className={`${sizeSt} rounded-lg`} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCarousel;
