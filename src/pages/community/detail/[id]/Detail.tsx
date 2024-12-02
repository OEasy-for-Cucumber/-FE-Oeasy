import edit from "../../../../../public/icons/moreIcon.png";
import show from "../../../../../public/icons/show.png";
import commentIcon from "../../../../../public/icons/comment.png";
import emptyHeart from "../../../../../public/icons/heart.png";
import fullHeart from "../../../../../public/icons/fullHeart.png";
import Comment from "../../components/Comment";
import { useEffect, useRef, useState } from "react";
import { parseISO, format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import instance from "../../../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../../../zustand/authStore";

interface PostData {
  id: number;
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  profileImg: string;
  likes: number;
  imageUrlList: Array<string>;
  liked: boolean;
}

function Detail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cmnId } = location.state;
  const [postData, setPostData] = useState<PostData | null>(null);
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(0);
  const user = useUserStore((state) => state.user);
  const [showEdit, setShowEdit] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const menuRef = useRef<HTMLImageElement | null>(null);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    if (!user) {
      alert("로그인 후 이용해주세요");
      navigate("/community");
      return;
    }
    if (cmnId) {
      fetchPostData();
    }
  }, [user]);

  const fetchPostData = async () => {
    try {
      const response = await instance.get(`api/community/${cmnId}/${user?.memberPk}`, {
        params: {
          cmnId: cmnId,
          memberId: user?.memberPk
        }
      });
      console.log(response);

      setPostData(response.data);
      setLiked(response.data.liked); // 서버에서 받은 데이터를 상태에 저장
      setLikedCount(response.data.likes); // 좋아요 초기값 설정
    } catch (error) {
      console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
      alert("게시물 데이터를 불러오는 데 실패했습니다.");
    }
  };

  const toggleLike = async () => {
    try {
      const response = await instance.get(`/api/community/like/${cmnId}/${user?.memberPk}`, {
        params: {
          cmnId: cmnId,
          memberId: user?.memberPk
        }
      });

      setLiked(response.data);

      if (response.data === true) {
        setLikedCount((prev: number) => prev + 1);
      } else {
        setLikedCount((prev: number) => prev - 1);
      }

      console.log("좋아요 상태 동기화 성공:", response.data);
    } catch (error) {
      console.error("좋아요 상태 업데이트 실패:", error);
      alert("좋아요 상태를 업데이트하는 데 실패했습니다.");
    }
  };

  const handleToggleMenu = (event: React.MouseEvent<HTMLImageElement>) => {
    const { top, left, height } = event.currentTarget.getBoundingClientRect();
    setShowEdit((prev) => !prev);
    setMenuPosition({
      top: top + height + window.scrollY, // 아이콘 바로 아래로 위치
      left: left + window.scrollX - 35 // 아이콘의 X 위치
    });
    menuRef.current = event.currentTarget;
  };

  const handleEdit = () => {
    navigate("/community/upload", { state: { postData } });
  };

  useEffect(() => {
    const handleResize = () => {
      if (showEdit && menuRef.current) {
        const { top, left, height } = menuRef.current.getBoundingClientRect();
        setMenuPosition({
          top: top + height + window.scrollY,
          left: left + window.scrollX - 35
        });
      }
    };

    // 리스너 추가
    window.addEventListener("resize", handleResize);

    // 리스너 정리
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showEdit]);

  const formatDate = (dateString: string): string => {
    const date = parseISO(dateString);
    const now = new Date();
    const differenceInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (differenceInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true, locale: ko });
    } else {
      return format(date, "yy.MM.dd");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말로 이 게시물을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    const requestDelete = {
      userId: user?.memberPk,
      cmnId: cmnId
    };

    try {
      await instance.delete("/api/community", {
        data: requestDelete
      });

      alert("게시물이 삭제되었습니다.");
      navigate("/community");
    } catch (error) {
      console.error("게시물 삭제 중 오류 발생:", error);
      alert("게시물 삭제에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="xl:w-[767px] mx-auto">
        <div className="px-6 py-6 divide-y divide-grayoe-800">
          {!postData ? (
            <p>로딩중</p>
          ) : (
            <div className="flex flex-col gap-2 pb-6">
              <p className="font-h5 xl:font-h4">{postData.title}</p>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <img src={postData.profileImg} alt="" className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col justify-center items-start gap-1">
                    <p className="font-b2-semibold">{postData.nickname}</p>
                    <p className="font-c2 text-grayoe-300">{formatDate(postData.createdAt)}</p>
                  </div>
                </div>
                <div className="flex gap-2 justify-center items-end font-c2">
                  <div className="flex justify-center items-center gap-1">
                    <img src={show} alt="조회수" className="w-[14px] h-[14px]" />
                    {/* <p>{postData.viewCnt}</p> */}
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    <img src={commentIcon} alt="댓글아이콘" className="w-[14px] h-[14px]" />
                    <p>{totalComments}</p>
                  </div>
                  {user?.nickname === postData.nickname && (
                    <>
                      <img
                        src={edit}
                        alt="Edit icon"
                        className="w-4 h-4 cursor-pointer"
                        onClick={handleToggleMenu} // 메뉴 위치 계산
                      />
                      {showEdit && menuPosition && (
                        <div
                          className="absolute bg-grayoe-400 rounded-md shadow-lg w-14 h-18 flex flex-col justify-center items-center"
                          style={{
                            top: `${menuPosition.top}px`,
                            left: `${menuPosition.left}px`
                          }}
                        >
                          <div className="py-2 cursor-pointer  rounded" onClick={handleEdit}>
                            수정
                          </div>
                          <div className="py-2 cursor-pointer rounded" onClick={handleDelete}>
                            삭제
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="pt-6">
            <p className="font-b2-regular xl:font-b1-regular">{postData?.content ?? "내용이 없습니다."}</p>
            {postData?.imageUrlList && postData.imageUrlList.length > 0 && (
              <div
                className={`min-h-[204px]  gap-2 justify-center pt-6 ${
                  postData.imageUrlList.length === 1
                    ? "grid-cols-1"
                    : postData.imageUrlList.length === 3
                      ? "grid-cols-2 grid-rows-2 xl:grid-cols-3"
                      : "grid-cols-2 xl:grid-cols-3 place-items-center"
                } grid`}
              >
                {postData.imageUrlList.map((img: string, index: number) => (
                  <img
                    key={index}
                    src={img}
                    alt={`게시물 이미지 ${index + 1}`}
                    className={`w-full rounded-lg ${postData.imageUrlList.length === 1 ? "h-[200px] " : "h-[180px]"} ${
                      postData.imageUrlList.length === 3 && index === 0 ? "col-span-2" : ""
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="flex justify-start items-center gap-1 pt-6">
              <img
                src={liked ? fullHeart : emptyHeart}
                alt={liked ? "꽉 찬 하트" : "빈 하트"}
                className="w-5 h-5 cursor-pointer"
                onClick={toggleLike}
              />
              <p className="font-b2-regular">{likedCount}</p>
            </div>
          </div>
        </div>
        <div className="border-grayoe-900 border-4 w-full xl:hidden" />
        <div className="py-6 px-6">
          <Comment communityId={cmnId} setTotalComments={setTotalComments} />
        </div>
      </div>
    </>
  );
}

export default Detail;
