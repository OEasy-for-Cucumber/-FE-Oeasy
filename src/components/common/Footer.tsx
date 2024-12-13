import { Link, useLocation } from "react-router-dom";
import Logo from "@/assets/icons/logo.webp";
import CrossArrow from "@/assets/icons/crossArrow.webp";
import Line from "@/assets/icons/line.webp";

function Footer() {
  const { pathname } = useLocation();

  return (
    <div
      className={`mx-auto min-w-[360px] max-w-[520px] xl:max-w-none xl:h-[216px] mt-[64px] mb-[40px] flex items-center ${pathname === "/" ? "bg-greenoe-950" : "bg-grayoe-950"} px-[24px] xl:px-0`}
    >
      <div>
        <img src={Logo} alt="로고" className="w-[160px] h-auto xl:mb-4" />
        <Link
          to={"https://github.com/OEasy-for-Cucumber"}
          target="_blank"
          className="hover:underline font-h5 flex gap-[4px] xl:mb-[10px] items-center w-[100px]"
        >
          Github
          <img src={CrossArrow} alt="링크화살표" className="w-[32px] h-[32px]" />
        </Link>
        <div className="xl:flex gap-[8px] xl:mb-2 text-grayoe-100 font-b2 items-center whitespace-nowrap hidden">
          <p className="font-b2-semibold mr-4">Developer</p>
          <p>김현빈</p>
          <img src={Line} alt="이름선" className="w-[1.5px] h-[10px]" />
          <p>박수미</p>
          <img src={Line} alt="이름선" className="w-[1.5px] h-[10px]" />
          <p>박진수</p>
          <img src={Line} alt="이름선" className="w-[1.5px] h-[10px]" />
          <p>서샛별</p>
          <img src={Line} alt="이름선" className="w-[1.5px] h-[10px]" />
          <p>임현아</p>
          <div className="hidden xl:flex">
            <p className="font-b2-semibold mx-4">Designer</p>
            <p>구현경</p>
          </div>
        </div>

        <div className="xl:hidden flex flex-col text-grayoe-100 font-b2 gap-2 mt-[10px]">
          <p className="font-b2-semibold mr-4">Developer</p>
          <div className="flex gap-[8px] items-center">
            <p>김현빈</p>
            <img src={Line} alt="이름선" className="w-[1.5px] h-[10px]" />
            <p>박수미</p>
            <img src={Line} alt="이름선" className="w-[1.5px] h-[10px]" />
            <p>박진수</p>
            <img src={Line} alt="이름선" className="w-[1.5px] h-[10px]" />
            <p>서샛별</p>
            <img src={Line} alt="이름선" className="w-[1.5px] h-[10px]" />
            <p>임현아</p>
          </div>
          <p className="font-b2-semibold">Designer</p>
          <p>구현경</p>
        </div>
        <p className="text-grayoe-100 text-[14px] mt-2">Copyright © 2024 Oeasy. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
