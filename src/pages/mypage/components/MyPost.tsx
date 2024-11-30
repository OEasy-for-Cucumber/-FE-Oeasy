import { useEffect, useState } from "react";
import instance from "../../../api/axios";
import { useUserStore } from "../../../zustand/authStore";
import { useSearchParams } from "react-router-dom";
import { Contents } from "../../../types/myContentsTypes";

function MyPost() {
  const [myPosts, setMyPosts] = useState<Contents[]>();
  const [searchParams, _setSearchParams] = useSearchParams();

  const user = useUserStore((state) => state.user);
  const currentPage = parseInt(searchParams.get("page") || "1");

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    const getMyPostsData = async () => {
      const data = await instance.get("/api/community/my-Cmn", {
        params: {
          page: currentPage - 1,
          size: 10,
          memberId: user?.memberPk,
        },
      });
      // 데이터 가져온 후 변환
      const formattedPosts = data.data.contents.map((post: Contents) => ({
        ...post,
        createTime: formatDate(post.createTime), // 날짜 포맷 변환
      }));
      setMyPosts(formattedPosts);
    };
    getMyPostsData();
  }, [currentPage, user]);

  return (
    <div className="w-full my-5 px-6">
      {!myPosts ? (
        <div className="text-center">작성한 게시글이 없습니다.</div>
      ) : (
        myPosts.map((post) => (
          <div className="w-full border-b py-4" key={post.boardPk}>
            <div className="flex flex-col">
              <p>{post.createTime}</p>
              <p>{post.title}</p>

              <div className="flex space-x-2">
                <p>{post.likeCnt > 0 ? post.likeCnt : 0}</p>
                <p>{post.viewCnt > 0 ? post.viewCnt : 0}</p>
                <p>{post.comentCnt > 0 ? post.comentCnt : 0}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyPost;
