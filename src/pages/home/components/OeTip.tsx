import { FC, useEffect, useState } from "react";
import quotes from "@/assets/img/quotes.webp";
import { scrollRefProps } from "@/types/scrollRef";
import { OeData } from "@/types/oeTip";
import instance from "@/api/axios";
import { useScrollEvent } from "@/hooks/useScrollEvent";

const OeTip: FC<scrollRefProps> = ({ scrollRef }) => {
  const [tipList, setTipList] = useState<OeData | null>(null);
  const [animation, setAnimation] = useState({ animationOne: false, animationTwo: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/api/tip");
        setTipList(res?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleScrollAnimation = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const viewportHeight = window.innerHeight;

      setAnimation(() => ({
        animationOne: scrollTop >= viewportHeight * 0.4,
        animationTwo: scrollTop >= viewportHeight * 0.7
      }));
    }
  };
  useScrollEvent(handleScrollAnimation, scrollRef);

  return (
    <section className="flex flex-col items-center justify-center h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] px-[35px] xl:p-0">
      <div className="flex flex-col gap-2 w-[281px] xl:w-[500px] mx-auto">
        <div className="font-h6 xl:font-h4 text-center">오이에 대해 얼마나 알고 계신가요?</div>
        <div className="font-h3 xl:font-h2 text-center">우리 오이는</div>
      </div>

      <div className="w-[281px] xl:w-full mx-auto will-change-transform">
        <img
          src={quotes}
          alt="큰따옴표"
          className={`${animation.animationOne ? "animate-fade-in-up" : "opacity-0"} w-[39px] xl:w-[60px] h-[29px] xl:h-[44px] my-10 mx-auto`}
        />
      </div>

      {tipList && (
        <div className="will-change-transform">
          <div className={`${animation.animationTwo ? "animate-fade-in-up" : "opacity-0"}`}>
            <img src={tipList.mobileImg} className="xl:hidden" />
            <img src={tipList.webImg} className="hidden xl:block h-[422px]" />
          </div>
        </div>
      )}
    </section>
  );
};

export default OeTip;
