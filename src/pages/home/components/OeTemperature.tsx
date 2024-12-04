import LocationIcon from "../../../../public/icons/Location.png";
import { useEffect, useState } from "react";
import instance from "../../../api/axios";
import Union from "../../../../public/img/Union.png";
import ShortLine from "../../../../public/icons/ShortLine.png";
import LongLine from "../../../../public/icons/LongLine.png";
import { OEIndexType } from "../../../types/oeIndexTypes";
import DangerCircle from "../../../../public/icons/Danger Circle.png";

function OeTemperature() {
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

  return (
    <div className="px-6 h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] flex justify-center items-center xl:items-start xl:pt-6">
      <div className="w-full h-[540px] relative">
        <h3 className="font-h3 xl:text-[48px] xl:mb-4">오늘의 OE지수</h3>
        <div className="flex gap-2 items-center py-1 mb-8">
          <img src={LocationIcon} alt="locationIcon" className="xl:w-[20px]" />
          <p className="font-b2-regular xl:text-[24px]">서울 영등포구</p>
          <p className="font-c2 text-grayoe-300 xl:text-[16px]">{timeOnly} 기준</p>
        </div>

        <p className="text-[72px] xl:text-[120px] font-bold text-greenoe-600">{oeIndexData?.temperature}°</p>

        <div className="flex text-grayoe-100 gap-2 xl:gap-3 xl:text-[24px] items-center relative">
          <button
            onClick={toggleTooltip}
            onBlur={hideTooltip}
            onMouseEnter={hoverTooltip}
            onMouseLeave={leaveTooltip}
            className="flex items-center gap-1 z-20 relative"
          >
            <img
              src={DangerCircle}
              alt="참고사항"
              className="w-[13px] xl:w-[24px] h-[13px] xl:h-[24px] cursor-pointer"
            />
            {isTooltipVisible && isTooltipHover && (
              <div className="absolute top-full left-0 -translate-x mt-2 w-[220px] xl:w-[350px] xl:text-[14px] py-3 px-4 bg-white text-grayoe-950 text-xs rounded-md border border-grayoe-100 shadow-lg z-10">
                <p className="mb-1">· OE지수란?</p>
                <p>
                  오이가 잘 자라는 온도는 18~28°C로 불쾌지수처럼 현재 기온에 따라 오이가 느끼는 행복감의 정도를
                  나타냅니다.
                </p>
                <p>기온에 따라 바뀌는 오이를 구경하세요!</p>
              </div>
            )}
          </button>
          <p>18</p>
          <img src={ShortLine} alt="ShortLine" className="w-[40px] h-1 xl:hidden" />
          <img src={LongLine} alt="LongLine" className="xl:w-[120px] h-1 hidden xl:flex" />
          <p>28</p>
        </div>

        <div className="w-full xl:w-[650px] ml-auto absolute right-0 top-[180px]">
          <div className="w-full flex justify-end">
            <img src={oeIndexData?.imgUrl} alt="날뛰는오이" className="w-[220px] xl:w-[400px]" />
          </div>

          <div className="flex flex-col w-full">
            <img src={Union} alt="말풍선" className="w-[285px] xl:w-[462px] relative left-0" />
            <p className="absolute bottom-9 left-[15%] xl:bottom-14 text-black font-semibold xl:text-[24px]">
              {oeIndexData?.word}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OeTemperature;
