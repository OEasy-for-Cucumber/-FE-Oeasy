import Heart from "@/assets/icons/heart.webp";
import Show from "@/assets/icons/show.webp";
import Coment from "@/assets/icons/comment.webp";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Contents } from "@/types/myContentsTypes";
import { useUserStore } from "@/zustand/authStore";
import instance from "@/api/axios";
import Pagination from "@/pages/community/components/Pagination";

function MyLiked() {
  const [myLikedPosts, setMyLikedPosts] = useState<Contents[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setToTalPages] = useState(0);
  const user = useUserStore((state) => state.user);
  const currentPage = parseInt(searchParams.get("likedPage") || "1");
  const navigate = useNavigate();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    const getMyLikedPostsData = async () => {
      const response = await instance.get("/api/community/my-likes", {
        params: {
          page: currentPage - 1,
          size: 5,
          memberId: user?.memberPk
        }
      });
      const { contents, totalPages } = response.data;
      setToTalPages(totalPages);
      const formattedPosts = contents.map((post: Contents) => ({
        ...post,
        createTime: formatDate(post.createTime) // 날짜 포맷 변환
      }));
      setMyLikedPosts(formattedPosts);
    };
    getMyLikedPostsData();
  }, [currentPage, user]);

  const goToPost = (boardPk: number) => {
    navigate(`/community/detail/${boardPk}`, {
      state: { cmnId: boardPk }
    });
  };

  return (
    <div className="w-full">
      {myLikedPosts?.length === 0 ? (
        <div className="text-center mt-8">좋아요한 게시글이 없습니다.</div>
      ) : (
        <div className="w-full xl:h-[500px]">
        {
        myLikedPosts?.map((post) => (
          <div key={post.boardPk}>
            <hr className="border-grayoe-900" />
            <div className="w-full py-4 px-6">
              <button className="flex flex-col" onClick={() => goToPost(post.boardPk!)}>
                <p className="text-grayoe-300 font-c2 mb-1">{post.createTime}</p>
                <p className="font-b2-semibold line-clamp-1">{post.title}</p>

                <div className="flex font-c2 items-center space-x-2 mt-2">
                  <div className="flex space-x-1">
                    <img src={Heart} alt="좋아요" className="w-[14px] h-[14px]" />
                    <p>{post.likeCnt > 0 ? post.likeCnt : 0}</p>
                  </div>
                  <div className="flex space-x-1">
                    <img src={Show} alt="조회수" className="w-[14px] h-[14px]" />
                    <p>{post.viewCnt > 0 ? post.viewCnt : 0}</p>
                  </div>
                  <div className="flex space-x-1">
                    <img src={Coment} alt="댓글" className="w-[14px] h-[14px]" />
                    <p>{post.comentCnt > 0 ? post.comentCnt : 0}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        ))
      }</div>)}
      {myLikedPosts && myLikedPosts.length > 0 && (
        <div className="flex justify-center mt-[20px] xl:mt-[50px]">
          <Pagination
            totalPageNumber={totalPages}
            currentPage={currentPage}
            setCurrentPage={(page) => setSearchParams({ likedPage: page.toString() })}
          />
        </div>
      )}
    </div>
  );
}

export default MyLiked;
