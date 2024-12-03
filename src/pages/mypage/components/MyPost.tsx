import { useEffect, useState } from "react";
import instance from "../../../api/axios";
import { useUserStore } from "../../../zustand/authStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Contents } from "../../../types/myContentsTypes";
import Heart from "../../../../public/icons/heart.png";
import Show from "../../../../public/icons/show.png";
import Coment from "../../../../public/icons/comment.png";
import Pagination from "../../community/components/Pagination";

function MyPost() {
  const [myPosts, setMyPosts] = useState<Contents[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setToTalPages] = useState(0);
  const user = useUserStore((state) => state.user);
  const currentPage = parseInt(searchParams.get("page") || "1");
  const navigate = useNavigate();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    const getMyPostsData = async () => {
      const response = await instance.get("/api/community/my-Cmn", {
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
        createTime: formatDate(post.createTime)
      }));
      setMyPosts(formattedPosts);
    };
    getMyPostsData();
  }, [currentPage, user]);

  const goToPost = (boardPk: number) => {
    navigate(`/community/detail/${boardPk}`, {
      state: { cmnId: boardPk }
    });
  };

  return (
    <div className="w-full my-5">
      {myPosts?.length === 0 ? (
        <div className="text-center mt-10">작성한 게시글이 없습니다.</div>
      ) : (
        myPosts?.map((post) => (
          <div key={post.boardPk}>
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
            <hr className="border-grayoe-900" />
          </div>
        ))
      )}

      {myPosts?.length! > 0 && (
        <div className="flex justify-center">
          <Pagination
            totalPageNumber={totalPages}
            currentPage={currentPage}
            setCurrentPage={(page) => setSearchParams({ page: page.toString() })}
          />
        </div>
      )}
    </div>
  );
}

export default MyPost;
