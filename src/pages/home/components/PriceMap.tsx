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
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [isTooltipHover, setIsTooltipHover] = useState<boolean>(false);
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [matchPrice, setMathPrice] = useState<string>();

  const handleRegionClick = (event: Event) => {
    const target = event.target as SVGElement;
    const regionId = target.id.slice(0, 2);
    if (!regionId) return;

    const matchingRegion = regionData.find((data) => data.region === regionId);

    if (matchingRegion) {
      setMathPrice(matchingRegion.price);
    }

    console.log(matchPrice);
  };

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

  return (
    <div className="w-full flex flex-col justify-center px-6 pt-2 h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)]">
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
          <p className="text-[14px] text-grayoe-200">가격(원/개당)</p>
        </div>
      </div>

      <ReactSVG
        src={mapSvg}
        beforeInjection={(svg) => {
          svg.addEventListener("click", handleRegionClick);
        }}
      />
    </div>
  );
}

export default PriceMap;
