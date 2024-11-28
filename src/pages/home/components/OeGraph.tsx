import DangerCircle from "../../../../public/icons/Danger Circle.png";
import { useEffect, useState } from "react";
import instance from "../../../api/axios";
import IncIcon from "../../../../public/icons/inc-icon.png";
import GraphIcon from "../../../../public/icons/graphicon.png";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

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
  
  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 280
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
      },
    },
    xaxis: {
      categories: oePriceData.map((data)=>data.date) || []
    },
  };

  const series = [
    {
      name: "price",
      data: oePriceData.map((data)=>data.price) || []
    }
  ];

  const lastIndex = oePriceData.length - 1;
  const todayPrice = oePriceData.length > 0 ? oePriceData[lastIndex] : { price: 0, date: "" }; // 기본값 설정

  return (
    <div className="h-[calc(100vh-56px)]xl:h-[calc(100vh-80px)] px-6 flex flex-col justify-center">
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

        <div className="w-full">
          <div className="w-full xl:w-[650px] mt-[35px] mx-auto">
            <ReactApexChart type="area" options={options} series={series} />
          </div>
          <div className="flex justify-center space-x-4 mt-8 w-full">
            <div className="grid items-center bg-white rounded-lg shadow-md py-1 w-[50%] h-[128px] px-4">
              <div className="flex justify-start">
                <img src={IncIcon} alt="상승아이콘" className="w-[20px]" />
                <span className="text-sm text-black font-b1-semibold ml-1">전일대비</span>
              </div>
              <span className="text-xl font-h3 text-red-500 ml-auto">
                {oePriceData.length > 0
                  ? oePriceData[oePriceData.length - 1].price - oePriceData[oePriceData.length - 2].price
                  : 0}
              </span>
            </div>

            <div className="grid items-center bg-white rounded-lg shadow-md py-1 w-[50%] h-[128px] px-4">
              <div className="flex justify-start items-center">
                <img src={GraphIcon} alt="가격아이콘" className="w-[18px] h-[18px]" />
                <span className="text-sm text-black font-b1-semibold ml-1">오늘 가격</span>
              </div>
              <span className="text-xl font-h3 text-grayoe-950 ml-auto truncate">
                {todayPrice.price > 0 ? todayPrice.price.toLocaleString() : "정보 없음"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OeGraph;
