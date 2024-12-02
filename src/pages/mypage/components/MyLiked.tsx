import Heart from "../../../../public/icons/heart.png";
import Show from "../../../../public/icons/show.png";
import Coment from "../../../../public/icons/comment.png";
import { useEffect, useState } from "react";
import { Contents } from "../../../types/myContentsTypes";
import { useSearchParams } from "react-router-dom";
import { useUserStore } from "../../../zustand/authStore";
import instance from "../../../api/axios";

function MyLiked() {
  const [myLikedPosts, setMyLikedPosts] = useState<Contents[]>();
  const [searchParams, _setSearchParams] = useSearchParams();

  const user = useUserStore((state) => state.user);
  const currentPage = parseInt(searchParams.get("page") || "1");

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    const getMyLikedPostsData = async () => {
      const data = await instance.get("/api/community/my-likes", {
        params: {
          page: currentPage - 1,
          size: 10,
          memberId: user?.memberPk
        }
      });
      // 데이터 가져온 후 변환
      const formattedPosts = data.data.contents.map((post: Contents) => ({
        ...post,
        createTime: formatDate(post.createTime) // 날짜 포맷 변환
      }));
      setMyLikedPosts(formattedPosts);
    };
    getMyLikedPostsData();
  }, [currentPage, user]);

  return (
    <div className="w-full my-5">
      {myLikedPosts?.length === 0 ? (
        <div className="text-center mt-10">좋아요한 게시글이 없습니다.</div>
      ) : (
        myLikedPosts?.map((post) => (
          <div key={post.boardPk}>
          <div className="w-full border-b border-grayoe-900 py-4 px-6">
            <div className="flex flex-col">
              <p className="text-grayoe-300 font-c2 mb-1">{post.createTime}</p>
              <p className="font-b2-semibold">{post.title}</p>

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
            </div>
          </div>
          <hr className="border-grayoe-900" /></div>
        ))
      )}
    </div>
  );
}

export default MyLiked