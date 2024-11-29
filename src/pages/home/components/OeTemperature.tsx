import LocationIcon from "../../../../public/icons/Location.png";
import { useEffect, useState } from "react";
import instance from "../../../api/axios";
import Union from "../../../../public/img/Union.png";
import ShortLine from "../../../../public/icons/ShortLine.png";
import LongLine from "../../../../public/icons/LongLine.png";
import { OEIndexType } from "../../../types/oeIndexTypes";

function OeTemperature() {
  const [oeIndexData, setOeIndexData] = useState<OEIndexType>();

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
    <div className="px-6 h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] flex justify-center mt-6 xl:mt-[250px]">
      <div className="w-full h-[540px] relative">
        <h3 className="font-h3 xl:text-[48px] xl:mb-4">오늘의 OE지수</h3>
        <div className="flex gap-2 items-center py-1 mb-8">
          <img src={LocationIcon} alt="locationIcon" className="xl:w-[20px]" />
          <p className="font-b2-regular xl:text-[24px]">서울 영등포구</p>
          <p className="font-c2 text-grayoe-300 xl:text-[16px]">{timeOnly} 기준</p>
        </div>

        {/* 온도 표시 */}
        <p className="text-[72px] xl:text-[120px] font-bold text-greenoe-600">{oeIndexData?.temperature}°</p>
        <div className="flex text-grayoe-100 gap-3 px-4 xl:text-[24px] items-center">
          <p>18</p>
          <img src={ShortLine} alt="ShortLine" className="w-[80px] h-1 xl:hidden" />
          <img src={LongLine} alt="LongLine" className="xl:w-[170px] h-1 hidden xl:flex" />
          <p>28</p>
        </div>

        {/* 오이 캐릭터 */}
        <div className="w-full xl:w-[650px] ml-auto absolute right-0 top-[180px]">
          <div className="w-full flex justify-end">
            <img src={oeIndexData?.imgUrl} alt="날뛰는오이" className="w-[220px] xl:w-[400px]" />
          </div>

          {/* 말풍선과 오이 한마디 */}
          <div className="flex flex-col w-full">
            <img
              src={Union}
              alt="말풍선"
              className="w-[285px] xl:w-[462px] relative left-0"
            />
            <p className="absolute bottom-9 left-5 xl:bottom-14 text-black font-semibold xl:text-[24px]">
              {oeIndexData?.cucumberType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OeTemperature;
