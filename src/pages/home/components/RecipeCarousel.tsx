import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import instance from "../../../api/axios";

function RecipeCarousel() {
  const [topImage, setTopImage] = useState<string[]>([]);
  const [buttonImage, setButtonImage] = useState<string[]>([]);

  const ulSt = "w-full h-[140px] flex flex-row gap-4";
  const imgSt = "w-[130px] h-[130px] rounded-xl";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/api/recipe/30");
        const images = res?.data;
        const middleIndex = Math.ceil(images.length / 2);
        const firstHalf = images.slice(0, middleIndex);
        const secondHalf = images.slice(middleIndex);
        setTopImage(firstHalf);
        setButtonImage(secondHalf);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="slider-container overflow-hidden">
      <div className="h-[285px] flex">
        <div className="flex flex-col justify-between">
          <div className="flex pr-4 animate-move-left">
            <ul className={ulSt}>
              {[...topImage, ...topImage]?.map((top, index) => (
                <li key={index} className="w-[130px] h-[130px]">
                  <img src={top} className={imgSt} />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex pr-4 animate-move-left">
            <ul className={`${ulSt} -translate-x-[75px]`}>
              {[...buttonImage, ...buttonImage]?.map((button, index) => (
                <li key={index} className="w-[130px] h-[130px]">
                  <img src={button} className={imgSt} />
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
