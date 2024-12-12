import { formatDistanceToNow, parseISO, format } from "date-fns";
import { ko } from "date-fns/locale";
import postHeart from "@/assets/icons/heart.webp";
import commentIcon from "@/assets/icons/comment.webp";
import filter from "@/assets/icons/filterIcon.webp";
import search from "@/assets/icons/Search.webp";
import close from "@/assets/icons/Icon.webp";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/zustand/authStore";
import useAlert from "@/hooks/useAlert";
import instance from "@/api/axios";
import Search from "./Search";
import WebSearch from "./WebSearch";
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
  const user = useUserStore((state) => state.user);
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const [showSearch, setShowSearch] = useState(false);
  const [posts, setPosts] = useState<contentTypes[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [sortKeyword, setSortKeyword] = useState("boardPk");
  const [sortType, setSortType] = useState("false");
  const messageRef = useRef<HTMLInputElement>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("titleAndContent");
  const fetchPosts = async (page: number, keyword = "", type = "titleAndContent") => {
    try {
      const response = await instance.get(`/api/community`, {
        params: {
          page: page - 1,
          size: 15,
          searchType: type,
          searchKeyword: keyword,
          sortKeyword,
          sortType
        }
      });
      const { contents, totalPages } = response.data;
      setPosts(contents);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("데이터 가져오기 오류", error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, searchKeyword, searchType);
  }, [currentPage, sortKeyword, sortType, searchKeyword, searchType]);

  const handleSearch = (type: string) => {
    const keyword = messageRef.current?.value || "";
    setSearchKeyword(keyword);
    setSearchType(type);
  };

  const toggleSortOrder = () => {
    if (sortKeyword === "boardPk" && sortType === "false") {
      setSortKeyword("likeCnt");
      setSortType("false");
    } else if (sortKeyword === "likeCnt" && sortType === "false") {
      setSortKeyword("boardPk");
      setSortType("true");
    } else {
      setSortKeyword("boardPk");
      setSortType("false");
    }
  };

  const handleUploadClick = () => {
    if (!user) {
      showAlert({
        message: "로그인 후 이용해주세요"
      });
      navigate("/login");
    } else {
      navigate("/community/upload");
    }
  };

  const handlePostClick = async (post: contentTypes) => {
    try {
      await instance.get(`/api/community/view/${post.boardPk}`);
      if (!user) {
        showAlert({
          message: "로그인 후 이용해주세요"
        });
        navigate("/login");
      } else {
        navigate(`/community/detail/${post.boardPk}`, {
          state: { cmnId: post.boardPk }
        });
      }
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setShowSearch(false);
        setSearchKeyword("");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="h-[calc(100vh-90px)] px-6 xl:w-[864px] mx-auto mt-1 flex flex-col justify-between items-center ">
        {showSearch && (
          <div className="w-full xl:hidden">
            <Search message={messageRef} onSearch={handleSearch} />
          </div>
        )}

        <div className="w-full pt-4 ">
          <div className="flex justify-between items-center font-c2">
            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <div className="flex gap-1" onClick={toggleSortOrder}>
                <img src={filter} alt="필터아이콘" className="w-[14px] h-[14px]" />
                <p className="font-c2 xl:font-c1">{getSortLabel()}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <div
                className="block w-8 h-8 p-2 border border-grayoe-400 rounded-md bg-grayoe-900 cursor-pointer xl:hidden"
                onClick={() => setShowSearch((prev) => !prev)}
              >
                <img src={showSearch ? close : search} alt="검색" />
              </div>
              <div className="hidden xl:block w-[300px] h-8">
                <WebSearch message={messageRef} onSearch={handleSearch} />
              </div>

              <button
                className="w-14 h-8 xl:w-16 font-c2 xl:font-c1 rounded-[4px] bg-grayoe-400 px-3 py-2 "
                onClick={handleUploadClick}
              >
                글쓰기
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full overflow-y-auto scrollbar-hidden">
          <div className="flex flex-col divide-y divide-grayoe-800">
            {posts.map((post, index) => (
              <div key={index} className="flex justify-between py-4 gap-2">
                <div className="flex flex-col gap-[8px]">
                  <p
                    className="inline-block font-b2-semibold xl:font-b1-semibold cursor-pointer"
                    onClick={() => handlePostClick(post)}
                  >
                    {post.title}
                  </p>

                  <div className="flex gap-2 font-c2 xl:font-c1">
                    <p className="text-grayoe-300">
                      {post.nickname} ・ {formatDate(post.createTime)}{" "}
                    </p>

                    <div className="flex justify-center items-center gap-1">
                      <img src={postHeart} alt="빈하트" className="w-[14px] h-[14px]" />
                      <p>{post.likeCnt}</p>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <img src={commentIcon} alt="댓글아이콘" className="w-[14px] h-[14px]" />
                      <p>{post.commentCnt}</p>
                    </div>
                  </div>
                </div>
                {post.thumbnailUrl && (
                  <img
                    className="w-[48px] h-[48px] xl:w-[56px] xl:h-[56px] rounded-md cursor-pointer"
                    src={post.thumbnailUrl}
                    alt="post 썸네일 이미지"
                    onClick={() => handlePostClick(post)}
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
    </>
  );
}
export default List;
