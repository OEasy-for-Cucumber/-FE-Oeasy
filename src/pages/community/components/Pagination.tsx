import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PaginationArrow from "./PaginationArrow";

interface PaginationProps extends PaginationStyle {
  totalPageNumber?: number;
  currentPage: number;
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
    setCurrentListCount(Math.floor((props.currentPage - 1) / 10));
  };

  useEffect(() => {
    settingCurrentListLevel();
  }, [props.currentPage]);

  useEffect(() => {
    if (props.totalPageNumber) {
      if (props.totalPageNumber - 10 * currentListCount > 10) {
        setCurrentPageList(Array.from({ length: 10 }));
      } else {
        setCurrentPageList([...Array(props.totalPageNumber - 10 * currentListCount)]);
      }
    }
  }, [currentListCount, props.totalPageNumber]);

  return (
    <div className="flex items-center py-6 px-4;">
      <PaginationArrow
        arrowType="left"
        onClick={() => {
          navigate(`community/${props.currentPage - 1}`);
          scrollTop();
        }}
        disabled={props.currentPage === 1}
      />
      <div className="flex justify-center min-w-[198px] my-0 mx-4">
        {currentPageList.map((value, index) => (
          <div
            key={index + currentListCount * 10}
            onClick={() => {
              navigate(`communtiy/${index + 1 + currentListCount * 10}`);
              scrollTop();
            }}
            className={`text-center ${props.currentPage === index + 1 + currentListCount * 10 ? "cursor-default" : "cursor-pointer"}}  `}
          >
            {index + 1 + currentListCount * 10}
          </div>
        ))}
      </div>
      <PaginationArrow
        arrowType="right"
        onClick={() => {
          navigate(`community/${props.currentPage + 1}`);
          scrollTop();
        }}
        disabled={props.currentPage === props.totalPageNumber}
      />
    </div>
  );
};

export default Pagination;
