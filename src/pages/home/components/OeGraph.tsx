import DangerCircle from "../../../../public/icons/Danger Circle.png";
import IncIcon from "../../../../public/icons/inc-icon.png";
// import DecIcon from "../../../../public/icons/dec-icon.png";
import GrapthIcon from "../../../../public/icons/graphicon.png";
import { useEffect, useState } from "react";
import instance from "../../../api/axios";
import PriceMap from "./map/PriceMap";

interface PriceData {
  price: number;
  date: string;
}

function OeGraph() {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [isTooltipHover, setIsTooltipHover] = useState<boolean>(false);
  const [oePriceData, setOePriceData] = useState<PriceData[]>([]);

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
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - 30);

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(currentDate);

    const getOePrice = async () => {
      try {
        const { data } = await instance.get(
          `/api/graph/range?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
        );
        setOePriceData(data);
      } catch (error) {
        console.error("Failed to fetch OE price data:", error);
      }
    };

    getOePrice();
  }, []);

  // 그래프의 최대 높이를 px 단위로 설정
  const maxBarHeight = 120;

  // 데이터 기반으로 최소, 최대값 계산
  const minPrice = Math.min(...oePriceData.map((data) => data.price));
  const maxPrice = Math.max(...oePriceData.map((data) => data.price));

  // 가격에 따라 막대 높이를 계산하는 함수
  const calculateBarHeight = (price: number) => {
    if (maxPrice === minPrice) return maxBarHeight; // 값이 모두 동일할 경우
    return ((price - minPrice) / (maxPrice - minPrice)) * maxBarHeight;
  };

  const lastIndex = oePriceData.length - 1;
  const todayPrice = oePriceData.length > 0 ? oePriceData[lastIndex] : { price: 0, date: "" }; // 기본값 설정

  return (
    <div className="h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] px-6 flex flex-col gap-2 justify-center items-center">
      <div className="w-full">
        <h3 className="font-h3 mb-2">지역별 오이가격</h3>
        <div className="flex gap-1 items-center relative">
          <button
            onClick={toggleTooltip}
            onBlur={hideTooltip}
            onMouseEnter={hoverTooltip}
            onMouseLeave={leaveTooltip}
            className="flex items-center gap-1"
          >
            <img src={DangerCircle} alt="참고사항" className="w-[13px] h-[13px] cursor-pointer" />
          </button>

          {isTooltipVisible && isTooltipHover && (
            <div className="absolute left-0 top-full mt-2 py-3 px-4 bg-white text-grayoe-950 text-xs rounded-md border border-grayoe-100 shadow-lg">
              <p className="mb-1">· 매일 정시 업데이트</p>
              <p>· 출처: 농넷</p>
            </div>
          )}
          <p className="text-[14px] text-grayoe-200">가격(원/kg)</p>
        </div>
      </div>
      <PriceMap/>
{/* 
      <div className="w-full">
        <h3 className="font-h3 mb-2">이번주 오이가격</h3>
        <div className="flex gap-1 items-center relative">
          <button
            onClick={toggleTooltip}
            onBlur={hideTooltip}
            onMouseEnter={hoverTooltip}
            onMouseLeave={leaveTooltip}
            className="flex items-center gap-1"
          >
            <img src={DangerCircle} alt="참고사항" className="w-[13px] h-[13px] cursor-pointer" />
          </button>

          {isTooltipVisible && isTooltipHover && (
            <div className="absolute left-0 top-full mt-2 py-3 px-4 bg-white text-grayoe-950 text-xs rounded-md border border-grayoe-100 shadow-lg">
              <p className="mb-1">· 매일 정시 업데이트</p>
              <p>· 출처: 농넷</p>
            </div>
          )}
          <p className="text-[14px] text-grayoe-200">가격(원/kg)</p>
        </div>
      </div> */}
    </div>
  );
}

export default OeGraph;
