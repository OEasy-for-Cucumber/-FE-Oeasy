import TopBtn from "../../components/common/TopBtn";
import Landing from "./components/Landing";
import OeGraph from "./components/OeGraph";
import OeTip from "./components/OeTip";
import AiOe from "./components/AiOe";
import Recipe from "./components/recipe/Recipe";
import OeIndex from "./components/OeIndex";
import { useEffect, useRef, useState } from "react";

function Home() {
  const outerDivRef = useRef<HTMLDivElement | null>(null);
  const isScrolling = useRef(false);
  const [headerHeight, setHeaderHeight] = useState(0);

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
      const outerDiv = outerDivRef.current;
      if (!outerDiv || isScrolling.current) return;

      isScrolling.current = true;
      const { scrollTop } = outerDiv;
      const pageHeight = window.innerHeight - headerHeight;
      const totalPages = 5;
      const currentPage = Math.round(scrollTop / pageHeight);

      if (deltaY > 0) {
        // 스크롤을 내릴 때
        if (currentPage < totalPages - 1) {
          outerDiv.scrollTo({
            top: (currentPage + 1) * pageHeight,
            left: 0,
            behavior: "smooth"
          });
        }
      } else {
        // 스크롤을 올릴 때
        if (currentPage > 0) {
          outerDiv.scrollTo({
            top: (currentPage - 1) * pageHeight,
            left: 0,
            behavior: "smooth"
          });
        }
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    };

    const outerDivRefCurrent = outerDivRef.current;
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
      <TopBtn />
      <div
        ref={outerDivRef}
        className={`overflow-y-auto h-[calc(100vh-56px)] xl:h-[calc(100vh-80px)] [&::-webkit-scrollbar]:hidden`}
      >
        <Landing />
        <div className="xl:px-[200px]">
          <OeTip />
          <OeIndex />
          <OeGraph />
          <Recipe />
        </div>
      </div>
    </>
  );
}

export default Home;
