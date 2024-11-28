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
  const [currentPageList, setCurrentPageList] = useState<string[]>([]); // 보여지는 페이지네이션 리스트
  const [currentListCount, setCurrentListCount] = useState<number>(0); // 현재 페이지네이션 리스트가 몇 단계를 나타내는지 보여줌 ex) 5페이지의 경우 0, 12페이지일 경우 1, 28 페이지일 경우 2

  useEffect(() => {
    if (props.totalPageNumber) {
      if (props.totalPageNumber < props.currentPage) {
        navigate(`/notFound`);
      }
    }
  }, []);

  /** 페이지네이션 리스트의 레벨을 설정해줌 */
  const settingCurrentListLevel = () => {
    setCurrentListCount(Math.floor((props.currentPage - 1) / 5));
  };

  useEffect(() => {
    settingCurrentListLevel();
  }, [props.currentPage]);

  useEffect(() => {
    if (props.totalPageNumber) {
      const startPage = currentListCount * 5 + 1; // 현재 리스트의 시작 페이지
      const endPage = Math.min(startPage + 5 - 1, props.totalPageNumber); // 끝 페이지
      setCurrentPageList(Array.from({ length: endPage - startPage + 1 }, (_, i) => (startPage + i).toString()));
    }
  }, [currentListCount, props.totalPageNumber]);

  return (
    <div className="flex items-center py-6 px-4;">
      <PaginationArrow
        arrowType="left"
        onClick={() => {
          if (props.currentPage > 1) {
            const startPage = currentListCount * 5 + 1;
            const previousPage = startPage - 1; // 현재 리스트 시작 페이지보다 한 단계 이전
            if (previousPage >= 1) {
              props.setCurrentPage(previousPage); // 이전 페이지로 이동
              setCurrentListCount(currentListCount - 1); // 리스트 레벨 감소
            }
            scrollTop();
          }
        }}
        disabled={props.currentPage === 1}
      />
      <div className="flex justify-center items-center my-0 mx-4 gap-4">
        {currentPageList.map((page) => (
          <div
            key={page}
            onClick={() => {
              props.setCurrentPage(parseInt(page));
              scrollTop();
            }}
            className={`text-center font-c2  w-4 h-4  ${
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
            const startPage = currentListCount * 5 + 1;
            const endPage = Math.min(startPage + 5 - 1, props.totalPageNumber || 0); // 현재 리스트의 끝 페이지
            const nextPage = endPage + 1; // 현재 리스트 끝 페이지보다 한 단계 이후
            if (nextPage <= (props.totalPageNumber || 0)) {
              props.setCurrentPage(nextPage); // 다음 페이지로 이동
              setCurrentListCount(currentListCount + 1); // 리스트 레벨 증가
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
