import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PaginationArrow from "./PaginationArrow";

interface PaginationProps extends PaginationStyle {
  totalPageNumber?: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

interface PaginationStyle {
  margin?: string;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const navigate = useNavigate();
  const scrollTop = () => {
    window.scrollTo({ top: 0 });
  };
  const [currentPageList, setCurrentPageList] = useState<string[]>([]);
  const [currentListCount, setCurrentListCount] = useState<number>(0);
  const [pageGroupSize, setPageGroupSize] = useState<number>(5);

  const updatePageGroupSize = () => {
    if (window.innerWidth >= 1440) {
      setPageGroupSize(10);
    } else {
      setPageGroupSize(5);
    }
  };

  useEffect(() => {
    updatePageGroupSize();
    window.addEventListener("resize", updatePageGroupSize);
    return () => window.removeEventListener("resize", updatePageGroupSize);
  }, []);

  useEffect(() => {
    if (props.totalPageNumber && props.totalPageNumber < props.currentPage) {
      navigate(`/notFound`);
    }
  }, [props.totalPageNumber, props.currentPage, navigate]);

  /** 페이지네이션 리스트의 레벨을 설정해줌 */
  const settingCurrentListLevel = () => {
    setCurrentListCount(Math.floor((props.currentPage - 1) / pageGroupSize));
  };

  useEffect(() => {
    settingCurrentListLevel();
  }, [props.currentPage, pageGroupSize]);

  useEffect(() => {
    if (props.totalPageNumber) {
      const startPage = currentListCount * pageGroupSize + 1; // 현재 리스트의 시작 페이지
      const endPage = Math.min(startPage + pageGroupSize - 1, props.totalPageNumber); // 끝 페이지
      setCurrentPageList(Array.from({ length: endPage - startPage + 1 }, (_, i) => (startPage + i).toString()));
    }
  }, [currentListCount, props.totalPageNumber, pageGroupSize]);

  return (
    <div className="flex items-center py-6 px-4;">
      <PaginationArrow
        arrowType="left"
        onClick={() => {
          if (props.currentPage > 1) {
            const startPage = currentListCount * pageGroupSize + 1;
            const previousPage = startPage - 1;
            if (previousPage >= 1) {
              props.setCurrentPage(previousPage);
              setCurrentListCount(currentListCount - 1);
            }
            scrollTop();
          }
        }}
        disabled={props.currentPage === 1}
      />
      <div className="flex justify-center items-center my-0 mx-4 gap-4 xl:gap-2">
        {currentPageList.map((page) => (
          <div
            key={page}
            onClick={() => {
              props.setCurrentPage(parseInt(page));
              scrollTop();
            }}
            className={`flex justify-center items-center text-center font-c2 xl:font-b2-regular w-4 h-4 xl:w-8 xl:h-8 ${
              props.currentPage === parseInt(page) ? " cursor-default bg-white text-black rounded-sm" : "cursor-pointer"
            }`}
          >
            {page}
          </div>
        ))}
      </div>
      <PaginationArrow
        arrowType="right"
        onClick={() => {
          if (props.currentPage < (props.totalPageNumber || 0)) {
            const startPage = currentListCount * pageGroupSize + 1;
            const endPage = Math.min(startPage + pageGroupSize - 1, props.totalPageNumber || 0);
            const nextPage = endPage + 1;
            if (nextPage <= (props.totalPageNumber || 0)) {
              props.setCurrentPage(nextPage);
              setCurrentListCount(currentListCount + 1);
            }
            scrollTop();
          }
        }}
        disabled={props.currentPage === props.totalPageNumber}
      />
    </div>
  );
};

export default Pagination;
