import { useState } from "react";
import topBtn from "../../../public/icons/up_btn.png";
import { useScrollEvent } from "../../hooks/useScrollEvent";

function TopBtn() {
  const [showBtn, setShowBtn] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleShowBtn = () => {
    setShowBtn(window.scrollY > 200 ? true : false);
  };

  useScrollEvent(handleShowBtn);

  return (
    <>
      {showBtn && (
        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 z-10 w-[40px] h-[40px] flex justify-center items-center bg-greenoe-50 rounded-xl"
        >
          <img src={topBtn} alt="top 버튼" className="w-[16px] h-[19px]" />
        </button>
      )}
    </>
  );
}

export default TopBtn;
