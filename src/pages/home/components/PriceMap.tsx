import { FC, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import mapSvg from "@/assets/southKoreaLow.svg";
import DangerCircle from "@/assets/icons/Danger-Circle.webp";
import { scrollRefProps } from "@/types/scrollRef";
import { useScrollEvent } from "@/hooks/useScrollEvent";
import instance from "@/api/axios";

interface RegionData {
  region: string;
  price: string;
}

const PriceMap: FC<scrollRefProps> = ({ scrollRef }) => {
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [isTooltipHover, setIsTooltipHover] = useState<boolean>(false);
  const [_isSvgTooltipVisible, setIsSvgTooltipVisible] = useState<boolean>(false);
  const [animation, setAnimation] = useState({ animationOne: false });
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    region?: string;
    price?: string;
  }>({ visible: false, x: 0, y: 0 });

  const hideTooltip = () => {
    setIsSvgTooltipVisible(false);
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const hoverTooltip = (x: number, y: number, region?: string, price?: string) => {
    setIsSvgTooltipVisible(true);
    setTooltip({
      visible: true,
      x,
      y,
      region,
      price
    });
  };

  const leaveTooltip = () => {
    setIsSvgTooltipVisible(false);
    hideTooltip();
  };

  const showInfoTooltip = () => {
    setIsTooltipHover(true);
    setIsTooltipVisible(true);
  };

  const hideInfoTooltip = () => {
    setIsTooltipHover(false);
    setIsTooltipVisible(false);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${month}/${day}`;
  };

  useEffect(() => {
    const getRegionPrice = async () => {
      const { data } = await instance.get("/graph/region");
      setRegionData(data);
    };
    getRegionPrice();
  }, []);

  const handleTouchStart = (event: TouchEvent) => {
    const target = event.target as SVGElement;
    const regionId = target.id.slice(0, 2);
    const matchingRegion = regionData.find((data) => data.region === regionId);

    hoverTooltip(
      event.touches[0].clientX,
      event.touches[0].clientY,
      matchingRegion?.region || regionId,
      matchingRegion?.price || "정보 없음"
    );
  };

  const handleMouseMove = (event: React.MouseEvent | MouseEvent) => {
    const target = event.target as SVGElement;
    const regionId = target.id.slice(0, 2);
    const matchingRegion = regionData.find((data) => data.region === regionId);

    hoverTooltip(
      event.clientX,
      event.clientY,
      matchingRegion?.region || regionId,
      matchingRegion?.price || "정보 없음"
    );
  };

  const handleMouseLeaveRegion = () => {
    leaveTooltip();
  };

  const handleMouseLeaveMap = () => {
    hideTooltip();
  };

  const handleScrollAnimation = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const viewportHeight = window.innerHeight;

      setAnimation(() => ({
        animationOne: scrollTop >= viewportHeight * 3.3
      }));

      hideTooltip();
    }
  };
  useScrollEvent(handleScrollAnimation, scrollRef);

  useEffect(() => {
    hideTooltip();
  }, [regionData]);

  return (
    <div className="w-full flex flex-col my-auto justify-center px-6 pt-2 h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)]">
      <div className="w-full xl:flex xl:justify-between xl:h-[530px]">
        <div className="w-full xl:w-[40%]">
          <h3 className="font-h3 xl:font-h2 mb-2">지역별 오이가격</h3>
          <div className="flex gap-1 items-center relative">
            <button className="flex items-center gap-1" onMouseEnter={showInfoTooltip} onMouseLeave={hideInfoTooltip}>
              <img
                src={DangerCircle}
                alt="참고사항"
                className="w-[13px] h-[13px] xl:w-[16px] xl:h-[16px] cursor-pointer filter-color"
              />
            </button>
            {isTooltipVisible && isTooltipHover && (
              <div className="absolute left-0 top-full mt-2 py-3 px-4 bg-white text-grayoe-950 text-xs rounded-md border border-grayoe-100 shadow-lg z-10">
                <p className="mb-1">· 매일 업데이트</p>
                <p>· 출처: kamis</p>
              </div>
            )}
            <p className="font-b1-regular text-grayoe-200">가격(원/개당) {getCurrentDate()} 기준</p>
          </div>
        </div>
        <div
          className={`${animation.animationOne ? "animate-fade-in-up" : "opacity-0"} relative w-[350px] h-auto xl:w-[60%] xl:h-[400px] mt-6 mx-auto`}
          onMouseLeave={handleMouseLeaveMap}
        >
          <ReactSVG
            src={mapSvg}
            className="xl:h-[530px]"
            beforeInjection={(svg) => {
              svg.setAttribute("class", "w-full h-full");
              svg.setAttribute("style", "cursor: pointer");
              const paths = svg.querySelectorAll("path");
              paths.forEach((path) => {
                const regionId = path.id.slice(0, 2);
                const matchingRegion = regionData.find((data) => data.region === regionId);

                if (matchingRegion) {
                  path.setAttribute("class", "land price");
                } else {
                  path.setAttribute("class", "land");
                }
                path.addEventListener("mousemove", handleMouseMove);
                path.addEventListener("touchstart", handleTouchStart);
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
          {tooltip.price && !isNaN(Number(tooltip.price)) ? Number(tooltip.price).toLocaleString() : "정보 없음"}
        </div>
      )}
    </div>
  );
};

export default PriceMap;
