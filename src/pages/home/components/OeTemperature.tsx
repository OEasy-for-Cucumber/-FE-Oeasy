import LocationIcon from "@/assets/icons/Location.webp";
import { FC, useEffect, useState } from "react";
import Union from "@/assets/img/Union.webp";
import ShortLine from "@/assets/icons/ShortLine.webp";
import LongLine from "@/assets/icons/LongLine.webp";
import DangerCircle from "@/assets/icons/Danger-Circle.webp";
import GroupOE from "@/assets/img/GroupOE.webp";
import { scrollRefProps } from "@/types/scrollRef";
import { OEIndexType } from "@/types/oeIndexTypes";
import instance from "@/api/axios";
import { useScrollEvent } from "@/hooks/useScrollEvent";

const OeTemperature: FC<scrollRefProps> = ({ scrollRef }) => {
  const [animation, setAnimation] = useState({ animationOne: false, animationTwo: false });
  const [oeIndexData, setOeIndexData] = useState<OEIndexType>();
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [isTooltipHover, setIsTooltipHover] = useState<boolean>(false);

  const toggleTooltip = () => {
    setIsTooltipVisible((prev) => !prev);
  };
  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  const hoverTooltip = () => {
    setIsTooltipHover(true);
    setIsTooltipVisible(true);
  };

  const leaveTooltip = () => {
    setIsTooltipHover(false);
  };

  useEffect(() => {
    const getOEIndexData = async () => {
      try {
        const res = await instance.get("/api/index");
        setOeIndexData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOEIndexData();
  }, []);

  const dateTime = oeIndexData?.dateTime;
  const date = new Date(dateTime as string);
  const timeOnly = date.toTimeString().split(" ")[0];

  const handleScrollAnimation = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const viewportHeight = window.innerHeight;

      setAnimation(() => ({
        animationOne: scrollTop >= viewportHeight * 2.3,
        animationTwo: scrollTop >= viewportHeight * 2.7
      }));
    }
  };
  useScrollEvent(handleScrollAnimation, scrollRef);

  return (
    <div className="px-6 h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] flex flex-col justify-center items-center xl:items-start my-auto">
      <div className="w-full h-[540px] relative">
        <div className="absolute xl:h-full">
        <h3 className="font-h3 xl:font-h2 xl:mb-2">오늘의 OE지수</h3>
        <div className="flex gap-1 items-center py-2 mb-6">
          <img src={LocationIcon} alt="locationIcon" className="w-[11px] h-[13px] xl:w-[14px] xl:h-[16px] location-color" />
          <p className="font-b2-regular xl:font-h5 text-grayoe-100">서울 영등포구</p>
          <p className="font-c2 text-grayoe-300 xl:font-b1-regular xl:mt-1">{timeOnly} 기준</p>
        </div>
        
        <div className={`${animation.animationOne ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-[72px] xl:text-[120px] font-bold text-greenoe-600">{oeIndexData?.temperature}°</p>

          <div className="flex text-grayoe-100 gap-2 xl:gap-3 xl:text-[24px] items-center">
            <button
              onClick={toggleTooltip}
              onBlur={hideTooltip}
              onMouseEnter={hoverTooltip}
              onMouseLeave={leaveTooltip}
              className="flex items-center gap-1 z-20"
            >
              <img
                src={DangerCircle}
                alt="참고사항"
                className="w-[13px] xl:w-[20px] h-[13px] xl:h-[20px] cursor-pointer filter-color"
              />
              {isTooltipVisible && isTooltipHover && (
                <div className="mt-2 w-[220px] xl:w-[332px] xl:h-[150px] xl:font-c2 py-2 px-4 bg-white text-grayoe-950 text-xs rounded-md border border-grayoe-100 shadow-lg z-10 text-start absolute xl:bottom-[9%]">
                  <p className="mb-1">· OE지수란?</p>
                  <p>
                    오이가 잘 자라는 온도는 18~28°C로 불쾌지수처럼<br />현재 기온에 따라 오이가 느끼는 행복감의 정도를
                    나타냅니다.
                  </p>
                  <p>기온에 따라 바뀌는 오이를 구경하세요!</p>
                  <img src={GroupOE} alt="오이캐릭터모음" className="mt-4"/>
                </div>
              )}
            </button>
            <p>18</p>
            <img src={ShortLine} alt="ShortLine" className="w-[60px] h-[2px] xl:hidden" />
            <img src={LongLine} alt="LongLine" className="xl:w-[120px] h-1 hidden xl:flex" />
            <p>28</p>
          </div>
        </div>
        </div>

        <div
          className={`${animation.animationTwo ? "animate-fade-in-up" : "opacity-0"} w-full h-[320px] xl:w-[650px] xl:h-[440px] ml-auto absolute xl:top-[10%] right-0 top-[30%]`}
        >
          <div className="w-full flex justify-end">
            <img src={oeIndexData?.imgUrl} alt="오이캐릭터" className="w-[220px] h-[220px] xl:w-[360px] xl:h-[360px]" />
          </div>

          <div className="flex flex-col w-[285px] h-[108px] xl:w-[462px] absolute bottom-0 xl:left-[2%]">
            <img src={Union} alt="말풍선" className="w-[285px] xl:w-[462px]" />
            <p className="w-full px-4 text-center text-grayoe-950 font-b1-semibold xl:font-h5 absolute bottom-[32%] xl:bottom-0">
              {oeIndexData?.word}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OeTemperature;
