import { useEffect, useRef, useState } from "react";
import quotes from "../../../../public/img/quotes.png";
import instance from "../../../api/axios";
import { OeData } from "../../../types/oeTip";

function OeTip() {
  const [tipList, setTipList] = useState<OeData | null>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/api/tip");
        setTipList(res?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] px-6">
      <div className="h-[690px]">
        <div className="flex flex-col gap-2 w-[281px] xl:w-[500px] mx-auto">
          <div className="font-h6 xl:font-h3 flex justify-center">오이에 대해 얼마나 알고 계신가요?</div>
          <div className="font-h3 xl:font-h1 flex justify-center">우리 오이는</div>
        </div>

        <div ref={tipRef} className="w-[281px] xl:w-full mx-auto">
          <img src={quotes} alt="큰따옴표" className="w-[39px] xl:w-[82px] h-[29px] xl:h-[60px] my-10 mx-auto" />
        </div>
        {tipList && (
          <div>
            <img src={tipList.mobileImg} className="xl:hidden" />
            <img src={tipList.webImg} className="hidden xl:block h-[440px]" />
          </div>
        )}
      </div>
    </section>
  );
}

export default OeTip;
