import DangerCircle from "../../../../public/icons/Danger Circle.png";
import IncIcon from "../../../../public/icons/inc-icon.png";
// import DecIcon from "../../../../public/icons/dec-icon.png";
import GrapthIcon from "../../../../public/icons/graphicon.png";
import { useState } from "react";

function OeGraph() {
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
  } 


  return (
    <div className="w-full h-screen px-6 py-4">
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
        <div className="w-full flex items-end justify-center space-x-3">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-sm mt-2">8,888</span>
            <div className="h-24 w-[20px] bg-gradient-to-t from-[#00903B] to-[#00C853] rounded"></div>
            <span className="text-sm">10/24</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-sm mt-2">8,888</span>
            <div className="h-28 w-[20px] bg-gradient-to-t from-[#00903B] to-[#00C853] rounded"></div>
            <span className="text-sm">10/24</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-sm mt-2">8,888</span>
            <div className="h-32 w-[20px] bg-gradient-to-t from-[#00903B] to-[#00C853] rounded"></div>
            <span className="text-sm">10/24</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-sm mt-2">8,888</span>
            <div className="h-36 w-[20px] bg-gradient-to-t from-[#00903B] to-[#00C853] rounded"></div>
            <span className="text-sm">10/24</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-sm mt-2">8,888</span>
            <div className="h-40 w-[20px] bg-gradient-to-t from-[#00903B] to-[#00C853] rounded"></div>
            <span className="text-sm">10/24</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-sm mt-2">8,888</span>
            <div className="h-44 w-[20px] bg-gradient-to-t from-[#00903B] to-[#00C853] rounded"></div>
            <span className="text-sm">10/24</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-sm mt-2">8,888</span>
            <div className="h-44 w-[20px] bg-gradient-to-t from-[#00903B] to-[#00C853] rounded"></div>
            <span className="text-sm">10/24</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <div className="grid items-center bg-white rounded-lg shadow-md py-1 w-[148px] h-[128px] px-4">
            <div className="flex justify-start">
              <img src={IncIcon} alt="상승아이콘" className="w-[20px]" />
              <span className="text-sm text-black font-b1-semibold ml-1">전일대비</span>
            </div>
            <span className="text-xl font-h3 text-red-500 ml-auto">+888</span>
          </div>

          <div className="grid items-center bg-white rounded-lg shadow-md py-1 w-[148px] h-[128px] px-4">
            <div className="flex justify-start items-center">
              <img src={GrapthIcon} alt="가격아이콘" className="w-[18px] h-[18px]" />
              <span className="text-sm text-black font-b1-semibold ml-1">오늘 가격</span>
            </div>
            <span className="text-xl font-h3 text-grayoe-950 ml-auto">8,888</span>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default OeGraph;
