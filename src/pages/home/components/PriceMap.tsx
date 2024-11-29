import { ReactSVG } from "react-svg";
import mapSvg from "../../../assets/southKoreaLow.svg";
import { useEffect, useState } from "react";
import DangerCircle from "../../../../public/icons/Danger Circle.png";
import instance from "../../../api/axios";

interface RegionData {
  region: string;
  price: string;
}

function PriceMap() {
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [isTooltipHover, setIsTooltipHover] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    region?: string;
    price?: string;
  }>({ visible: false, x: 0, y: 0 });

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
    const getRegionPrice = async () => {
      const { data } = await instance.get("/graph/region");
      setRegionData(data);
    };
    getRegionPrice();
  }, []);

  const handleMouseMove = (event: React.MouseEvent | MouseEvent) => {
    const target = event.target as SVGElement;
    const regionId = target.id.slice(0, 2);

    const matchingRegion = regionData.find((data) => data.region === regionId);
    setTooltip({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      region: matchingRegion?.region || regionId,
      price: matchingRegion?.price || "정보 없음",
    });
  };

  const handleMouseLeaveRegion = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const handleMouseLeaveMap = () => {
    setTooltip({ visible: false, x: 0, y: 0 });
  };

  const getCurrentDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${month}/${day}`;
  };

  return (
    <div className="w-full flex flex-col justify-center px-6 pt-2 h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)]">
      <div className="w-full xl:flex xl:justify-between xl:h-[600px]">
        <div className="w-full xl:w-[40%]">
          <h3 className="font-h3 xl:font-h1 mb-2">지역별 오이가격</h3>
          <div className="flex gap-1 items-center relative">
            <button className="flex items-center gap-1">
              <img
                src={DangerCircle}
                alt="참고사항"
                className="w-[13px] xl:w-[24px] h-[13px] xl:h-[24px] cursor-pointer"
                onClick={toggleTooltip}
                onBlur={hideTooltip}
                onMouseEnter={hoverTooltip}
                onMouseLeave={leaveTooltip}
              />
            </button>
            {isTooltipVisible && isTooltipHover && (
            <div className="absolute left-0 top-full mt-2 py-3 px-4 bg-white text-grayoe-950 text-xs rounded-md border border-grayoe-100 shadow-lg z-10">
              <p className="mb-1">· 매일 업데이트</p>
              <p>· 출처: kamis</p>
            </div>
          )}
            <p className="text-[14px] xl:font-h4 text-grayoe-200">
              가격(원/개당) {getCurrentDate()} 기준
            </p>
          </div>
        </div>
        <div
          className="relative w-[300px] h-[400px] xl:w-[60%] xl:h-[400px]"
          onMouseLeave={handleMouseLeaveMap} // 지도 전체에서 마우스 벗어남 처리
        >
          <ReactSVG
            src={mapSvg}
            beforeInjection={(svg) => {
              svg.setAttribute("class", "w-full h-full");
              svg.setAttribute("style", "cursor: pointer");
              const paths = svg.querySelectorAll("path");
              paths.forEach((path) => {
                path.addEventListener("mousemove", handleMouseMove);
                path.addEventListener("mouseleave", handleMouseLeaveRegion);
              });
            }}
          />
        </div>
      </div>
      {tooltip.visible && (
        <div
          className="absolute w-[93px] h-[62px] bg-grayoe-700 text-center py-2 rounded-md shadow-md"
          style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
        >
          <p className="font-b2-regular">{tooltip.region}</p>
          {tooltip.price && !isNaN(Number(tooltip.price))
        ? Number(tooltip.price).toLocaleString()
        : "정보 없음"}
        </div>
      )}
    </div>
  );
}

export default PriceMap;
