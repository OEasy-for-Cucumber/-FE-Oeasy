import { useScrollEvent } from "@/hooks/useScrollEvent";
import { useEffect, useRef, useState } from "react";
import AiOe from "./components/AiOe";
import TopBtn from "@/components/common/TopBtn";
import Landing from "./components/Landing";
import OeTip from "./components/OeTip";
import OeVote from "./components/OeVote";
import OeTemperature from "./components/OeTemperature";
import PriceMap from "./components/PriceMap";
import Recipe from "./components/recipe/Recipe";
import Footer from "@/components/common/Footer";
import OeGraph from "./components/OeGraph";

function Home() {
  const outerDivRef = useRef<HTMLDivElement | null>(null);
  const isScrolling = useRef(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const outerDivRefCurrent = outerDivRef.current;

  // top버튼 스크롤 이벤트
  useScrollEvent(() => {
    if (outerDivRefCurrent) {
      const scrollTop = outerDivRefCurrent.scrollTop;
      setShowTopBtn(scrollTop > 1);
    }
  }, outerDivRef);

  const calculateHeaderHeight = () => {
    if (window.innerWidth >= 1440) {
      setHeaderHeight(80);
    } else {
      setHeaderHeight(56);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      calculateHeaderHeight();
    };

    window.addEventListener("resize", handleResize);

    calculateHeaderHeight();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setHeaderHeight]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { deltaY } = e;
      wheelHandler(deltaY);
    };

    const wheelHandler = (deltaY: number) => {
      if (!outerDivRefCurrent || isScrolling.current) return;

      isScrolling.current = true;
      const { scrollTop } = outerDivRefCurrent;
      const pageHeight = window.innerHeight - headerHeight;
      const totalPages = 8;
      const currentPage = Math.round(scrollTop / pageHeight);

      if (deltaY > 0) {
        // 스크롤을 내릴 때
        if (currentPage < totalPages - 1) {
          outerDivRefCurrent.scrollTo({
            top: (currentPage + 1) * pageHeight,
            behavior: "smooth"
          });
        }
      } else {
        // 스크롤을 올릴 때
        if (currentPage > 0) {
          outerDivRefCurrent.scrollTo({
            top: (currentPage - 1) * pageHeight,
            behavior: "smooth"
          });
        }
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 1200);
    };

    if (outerDivRefCurrent) {
      outerDivRefCurrent.addEventListener("wheel", handleWheel, { passive: false });
    }
    if (outerDivRefCurrent) {
      return () => {
        outerDivRefCurrent.removeEventListener("wheel", handleWheel);
      };
    }
  }, [headerHeight]);

  return (
    <>
      <AiOe />
      {showTopBtn && <TopBtn scrollRef={outerDivRef} />}
      <div
        ref={outerDivRef}
        className={`overflow-y-auto h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] [&::-webkit-scrollbar]:hidden `}
      >
        <Landing />
        <div className="xl:px-[200px] xl:w-[1440px] mx-auto">
          <OeTip scrollRef={outerDivRef} />
          <OeVote scrollRef={outerDivRef} />
          <OeTemperature scrollRef={outerDivRef} />
          <PriceMap scrollRef={outerDivRef} />
          <OeGraph/>
          <Recipe />
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default Home;
