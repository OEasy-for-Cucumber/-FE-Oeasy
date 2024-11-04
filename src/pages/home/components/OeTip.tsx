import { useEffect, useState } from "react";
import quotes from "../../../../public/img/quotes.png";
import instance from "../../../api/axios";

interface OeTip {
  content: string;
  color: string;
  order: number;
}

interface OeData {
  content: string;
  oeTipTitleDTOList: OeTip[];
}

function OeTip() {
  const [tipList, setTipList] = useState<OeData | null>(null);

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
    <section className="flex flex-col items-center h-[calc(100vh-56px)] xl:h-[calc(100vh-80px) mx-6 border border-blue-700">
      <div className="flex flex-col gap-2 border border-red-700 w-[281px] mx-auto">
        <h6 className="font-h6 flex justify-center">오이에 대해 얼마나 알고 계신가요?</h6>
        <h3 className="font-h3 flex justify-center">우리 오이는</h3>
      </div>

      <div className="border border-pink-400 w-[281px] mx-auto">
        <img src={quotes} alt="큰따옴표" width="39px" height="29px" className="my-10 mx-auto" />
        {tipList && (
          <div>
            {tipList.oeTipTitleDTOList.map((list, index) => (
              <div key={index} className="flex flex-row justify-center text-center text-[48px] font-SBAggroB">
                {/* justify-center text-center 이거 왜 따로 적용되지? 왜?? */}
                <div style={{ color: list.color }}>{list.content}</div>
              </div>
            ))}
            <div className="text-center text-grayoe-50 text-sm">{tipList.content}</div>
          </div>
        )}
      </div>
    </section>
  );
}

export default OeTip;
