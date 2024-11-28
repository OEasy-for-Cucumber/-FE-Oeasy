import { formatDistanceToNow, parseISO, format } from "date-fns";
import { ko } from "date-fns/locale";
import postHeart from "../../../../public/icons/heart.png";
import commentIcon from "../../../../public/icons/comment.png";
import filter from "../../../../public/icons/filterIcon.png";
import search from "../../../../public/icons/Search.png";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "./Search";
import instance from "../../../api/axios";

interface contentTypes {
  boardPk: string;
  title: string;
  viewCnt: number;
  likeCnt: number;
  thumbnailUrl: string;
  nickname: string;
}

function List() {
  // const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [posts, setPosts] = useState<contentTypes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchPosts = async (page: number) => {
    try {
      const response = await instance.get(`/api/community`, {
        params: {
          page: page - 1,
          size: 1,
          searchType: "titleAndContent",
          sortKeyword: "boardPk",
          sortType: "false"
        }
      });
      console.log(response.data);
      const { content, totalPages } = response.data;
      setPosts(content);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("데이터 가져오기 오류", error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  console.log(posts);

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
        <div className="px-6 xl:w-[767px] mx-auto mt-1">
          <div className="flex justify-between items-center font-c2">
            <div className="flex gap-1">
              <img src={filter} alt="필터아이콘" className="w-[14px] h-[14px]" />
              <p className="font-c2 xl:font-c1">인기순</p>
            </div>
            <div className="flex gap-2">
              {/* Toggle Search component */}
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
                  <div className="truncate-title font-b2-semibold xl:font-b1-semibold cursor-pointer">{post.title}</div>
                  <div className="flex gap-2 font-c2 xl:font-c1">
                    <p className="text-grayoe-300">{post.nickname}</p>

                    <div className="flex justify-center items-center gap-1">
                      <img src={postHeart} alt="빈하트" className="w-[14px] h-[14px]" />
                      <p>{post.likeCnt}</p>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <img src={commentIcon} alt="댓글아이" className="w-[14px] h-[14px]" />
                      {/* <p>{post.comments}</p> */}
                    </div>
                  </div>
                </div>
                <img
                  className="w-[48px] h-[48px] xl:w-[56px] xl:h-[56px] rounded-md"
                  src={post.thumbnailUrl}
                  alt="post 첫번째 이미지"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default List;
