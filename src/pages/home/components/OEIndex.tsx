import LocationIcon from "../../../../public/icons/Location.png";
import { useEffect, useState } from "react";
import { OEIndexType } from "../../../types/oeIndexTypes";
import instance from "../../../api/axios";
import Oesample from "../../../../public/img/oeindexsample.png"
import Union from "../../../../public/img/Union.png";;

function OEIndex() {
  const [oeIndexData, setOeIndexData] = useState<OEIndexType>();

  const getOEIndexData = async () => {
    try {
      const res = await instance.get("/api/index");
      setOeIndexData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dateTime = oeIndexData?.dateTime
  const date = new Date(dateTime as string);
  const timeOnly = date.toTimeString().split(' ')[0];

  useEffect(() => {
    getOEIndexData();
  }, []);

  return (
    <div className="w-full px-6 h-screen xl:px-[200px]">
      <div>
        <h3 className="font-h3">오늘의 OE지수</h3>
        <div className="flex gap-2 items-center py-1 mb-8">
          <img src={LocationIcon} alt="locationIcon" />
          <p className="font-b2-regular">서울 영등포구</p>
          <p className="font-c2 text-grayoe-300">{timeOnly} 기준</p>
        </div>
  
        {/* 온도 표시 */}
        <p className="text-[72px] font-bold text-greenoe-600">{oeIndexData?.temperature}°</p>
        <div className="flex text-grayoe-100 gap-3 px-4">
          <p>18</p>
          <p className="text-gray-600">-------</p>
          <p>28</p>
        </div>
  
        {/* 오이 캐릭터 */}
        <div className="w-full flex justify-end">
          <img src={Oesample} alt="날뛰는오이" className="w-[210px]" />
        </div>
      </div>
  
      {/* 말풍선과 오이 한마디 */}
      <div className="relative flex flex-col items-center mt-4">
        <img src={Union} alt="말풍선" className="w-3/4 xl:w-[387px] xl:ml-[60%]" />
        <p className="absolute bottom-8 text-black font-semibold">
          쑥쑥 자라기 딱 좋은 날씨에요!
        </p>
      </div>
    </div>
  );
  
}

export default OEIndex;
