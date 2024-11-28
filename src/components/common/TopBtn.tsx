import { FC } from "react";
import topBtn from "../../../public/icons/up_btn.png";
import { scrollRefProps } from "../../types/scrollRef";

const TopBtn: FC<scrollRefProps> = ({ scrollRef }) => {
  const handleScrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <button
        onClick={handleScrollToTop}
        className="fixed right-[10%] xl:right-[80px] bottom-6 xl:bottom-[16px] z-10 w-[40px] h-[40px] xl:w-[56px] xl:h-[56px] flex justify-center items-center bg-greenoe-50 rounded-xl xl:rounded-2xl"
      >
        <img src={topBtn} alt="top 버튼" className="w-[16px] h-[19px] xl:w-[23px] xl:h-[28px]" />
      </button>
    </>
  );
};

export default TopBtn;
