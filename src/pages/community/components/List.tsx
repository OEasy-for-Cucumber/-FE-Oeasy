import { formatDistanceToNow, parseISO, format } from "date-fns";
import { ko } from "date-fns/locale";
import postHeart from "../../../../public/icons/heart.png";
import commentIcon from "../../../../public/icons/comment.png";
import filter from "../../../../public/icons/filterIcon.png";
import search from "../../../../public/icons/Search.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "./Search";
import instance from "../../../api/axios";
import Pagination from "./Pagination";

interface contentTypes {
  boardPk: string;
  title: string;
  viewCnt: number;
  likeCnt: number;
  thumbnailUrl: string;
  nickname: string;
  commentCnt: number;
  createTime: string;
}

function List() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const [showSearch, setShowSearch] = useState(false);
  const [posts, setPosts] = useState<contentTypes[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [sortKeyword, setSortKeyword] = useState("boardPk");
  const [sortType, setSortType] = useState("false");
  const fetchPosts = async (page: number) => {
    try {
      const response = await instance.get(`/api/community`, {
        params: {
          page: page - 1,
          size: 15,
          searchType: "titleAndContent",
          sortKeyword,
          sortType
        }
      });
      console.log(response.data);
      const { contents, totalPages } = response.data;
      setPosts(contents);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("데이터 가져오기 오류", error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, sortKeyword, sortType]);

  console.log(posts);

  const toggleSortOrder = () => {
    if (sortKeyword === "boardPk" && sortType === "false") {
      // 현재 최신순인 경우 → 인기순
      setSortKeyword("likeCnt");
      setSortType("false");
    } else if (sortKeyword === "likeCnt" && sortType === "false") {
      // 현재 인기순인 경우 → 오래된순
      setSortKeyword("boardPk");
      setSortType("true");
    } else {
      // 현재 오래된순인 경우 → 최신순
      setSortKeyword("boardPk");
      setSortType("false");
    }
  };

  const handlePostClick = async (post: contentTypes) => {
    try {
      await instance.get(`/api/community/view/${post.boardPk}`);

      navigate(`/community/detail/${post.boardPk}`, {
        state: { cmnId: post.boardPk, viewCnt: post.viewCnt + 1, commentCnt: post.commentCnt }
      });
    } catch (error) {
      console.error("조회수 증가 요청 실패", error);
    }
  };

  const getSortLabel = () => {
    if (sortKeyword === "boardPk" && sortType === "false") return "최신순";
    if (sortKeyword === "likeCnt" && sortType === "false") return "인기순";
    if (sortKeyword === "boardPk" && sortType === "true") return "오래된순";
  };

  function formatDate(dateString: string): string {
    const date = parseISO(dateString);
    const now = new Date();
    const differenceInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (differenceInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true, locale: ko });
    } else {
      return format(date, "yy.MM.dd");
    }
  }
  return (
    <>
      {showSearch ? (
        <Search />
      ) : (
        <div className="h-[calc(100vh-56px)] px-6 xl:w-[767px] mx-auto mt-1 flex flex-col justify-between items-center ">
          <div className="w-full">
            <div className="flex justify-between items-center font-c2">
              <div className="flex flex-col items-center gap-1 cursor-pointer">
                <div className="flex gap-1">
                  <img src={filter} alt="필터아이콘" className="w-[14px] h-[14px]" onClick={toggleSortOrder} />
                  <p className="font-c2 xl:font-c1">{getSortLabel()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div
                  className="w-8 h-8 p-2 border border-grayoe-400 rounded-md bg-grayoe-900 cursor-pointer"
                  onClick={() => setShowSearch(true)}
                >
                  <img src={search} alt="검색" />
                </div>
                <Link to="/community/upload">
                  <button className="w-14 h-8 xl:w-16 font-c2 xl:font-c1 rounded-[4px] bg-grayoe-400 px-3 py-2 ">
                    글쓰기
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col divide-y divide-grayoe-800">
              {posts.map((post, index) => (
                <div key={index} className="flex justify-between py-4 gap-2">
                  <div className="flex flex-col gap-[8px] flex-[8.5]">
                    <div
                      className="truncate-title font-b2-semibold xl:font-b1-semibold cursor-pointer"
                      onClick={() => handlePostClick(post)}
                    >
                      {post.title}
                    </div>

                    <div className="flex gap-2 font-c2 xl:font-c1">
                      <p className="text-grayoe-300">
                        {post.nickname} ・ {formatDate(post.createTime)}{" "}
                      </p>

                      <div className="flex justify-center items-center gap-1">
                        <img src={postHeart} alt="빈하트" className="w-[14px] h-[14px]" />
                        <p>{post.likeCnt}</p>
                      </div>
                      <div className="flex justify-center items-center gap-1">
                        <img src={commentIcon} alt="댓글아이" className="w-[14px] h-[14px]" />
                        <p>{post.commentCnt}</p>
                      </div>
                    </div>
                  </div>
                  {post.thumbnailUrl && (
                    <img
                      className="w-[48px] h-[48px] xl:w-[56px] xl:h-[56px] rounded-md"
                      src={post.thumbnailUrl}
                      alt="post 썸네일 이미지"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <Pagination
              totalPageNumber={totalPages}
              currentPage={currentPage}
              setCurrentPage={(page) => setSearchParams({ page: page.toString() })}
            />
          </div>
        </div>
      )}
    </>
  );
}
export default List;
