import DangerCircle from "../../../../public/icons/Danger Circle.png";
import { useEffect, useState } from "react";
import instance from "../../../api/axios";
import IncIcon from "../../../../public/icons/inc-icon.png";
import GraphIcon from "../../../../public/icons/graphicon.png";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Loading from "../../../components/common/Loading";

interface PriceData {
  date: string;
  price: number;
  region: string;
}

function OeGraph() {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [isTooltipHover, setIsTooltipHover] = useState<boolean>(false);
  const [oePriceData, setOePriceData] = useState<PriceData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
  useEffect(() => {
    const getOePrice = async () => {
      try {
        const { data }: { data: PriceData[] } = await instance.get(
          `/graph/average?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
        );
        setOePriceData(data);
      } catch (error) {
        console.error("Failed to fetch OE price data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getOePrice();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const series =
    oePriceData.length > 0
      ? [
          {
            name: "price",
            data: oePriceData.filter((data) => data.price !== null).map((data) => data.price)
          }
        ]
      : [];

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false
      },
      background: "transparent",
      zoom: {
        enabled: false,
        allowMouseWheelZoom: false
      }
    },
    xaxis: {
      categories: oePriceData.filter((data) => data.price !== null).map((data) => data.date.slice(5)),
      labels: {
        rotate: -45,
        rotateAlways: true
      }
    },
    yaxis: { show: false },
    stroke: {
      curve: "smooth"
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#09DE614D"],
        stops: [0, 100],
        opacityFrom: 0.6,
        opacityTo: 0.1
      }
    },
    grid: {
      show: false
    },
    colors: ["#00C853"],
    theme: {
      mode: "dark"
    }
  };

  const lastIndex = oePriceData.length - 1;
  const todayPrice = oePriceData.length > 0 ? oePriceData[lastIndex] : { price: 0, date: "" }; // 기본값 설정

  return (
    <div className="w-full h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] px-6 flex flex-col justify-center">
      <div className="w-full truncate">
        <h3 className="font-h3 mb-2 xl:font-h1">이번주 오이가격</h3>
        <div className="flex gap-1 items-center relative">
          <button
            onClick={toggleTooltip}
            onBlur={hideTooltip}
            onMouseEnter={hoverTooltip}
            onMouseLeave={leaveTooltip}
            className="flex items-center gap-1"
          >
            <img
              src={DangerCircle}
              alt="참고사항"
              className="w-[13px] xl:w-[24px] h-[13px] xl:h-[24px] cursor-pointer"
            />
          </button>

          {isTooltipVisible && isTooltipHover && (
            <div className="absolute left-0 top-full mt-2 py-3 px-4 bg-white text-grayoe-950 text-xs rounded-md border border-grayoe-100 shadow-lg z-10">
              <p className="mb-1">· 매일 업데이트</p>
              <p>· 출처: kamis</p>
            </div>
          )}
          <p className="text-[14px] xl:font-h4 text-grayoe-200">가격(원/개당)</p>
        </div>

        <div className="w-full xl:flex xl:space-x-8 items-center">
          <div className="mt-4 w-full h-[280px] xl:w-[60%] xl:h-[400px]">
            <ReactApexChart type="area" options={options} series={series} width="100%" height="100%" />
          </div>

          <div className="w-full xl:w-[40%]">
            <div className="flex space-x-4 mt-4 xl:space-x-0 w-full xl:flex-col xl:gap-4">
              <div className="grid items-center bg-white rounded-lg shadow-md py-1 w-[50%] xl:w-full h-[128px] px-4">
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

              <div className="grid items-center bg-white rounded-lg shadow-md py-1 w-[50%] xl:w-full h-[128px] px-4">
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
    </div>
  );
}

export default OeGraph;
