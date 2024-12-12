import edit from "@/assets/icons/moreIcon.webp";
import show from "@/assets/icons/show.webp";
import commentIcon from "@/assets/icons/comment.webp";
import emptyHeart from "@/assets/icons/heart.webp";
import fullHeart from "@/assets/icons/fullHeart.webp";
import defaultImg from "@/assets/img/defaultProfile.webp";
import { useEffect, useRef, useState } from "react";
import { parseISO, format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useLocation, useNavigate } from "react-router-dom";
import { PostData } from "@/types/postDataTypes";
import { useUserStore } from "@/zustand/authStore";
import useConfirm from "@/hooks/useConfirm";
import useAlert from "@/hooks/useAlert";
import instance from "@/api/axios";
import Comment from "../../components/Comment";

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
  const { showConfirm } = useConfirm();
  const { showAlert } = useAlert();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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

      setPostData(response.data);
      setLiked(response.data.liked);
      setLikedCount(response.data.likes);
    } catch (error) {
      console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
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
    } catch (error) {
      console.error("좋아요 상태 업데이트 실패:", error);
    }
  };

  const handleToggleMenu = (event: React.MouseEvent<HTMLImageElement>) => {
    const { top, left, height } = event.currentTarget.getBoundingClientRect();
    setShowEdit((prev) => !prev);
    setMenuPosition({
      top: top + height + window.scrollY,
      left: left + window.scrollX - 35
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

    window.addEventListener("resize", handleResize);

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
    showConfirm({
      message: "게시물을 삭제할까요?",
      subMessage: "삭제한 글은 되돌릴 수 없어요.",
      onConfirm: async () => {
        const requestDelete = {
          userId: user?.memberPk,
          cmnId: cmnId
        };

        try {
          await instance.delete("/api/community", {
            data: requestDelete
          });

          showAlert({ message: "게시물이 삭제되었습니다." });
          navigate("/community");
        } catch (error) {
          console.error("게시물 삭제 중 오류 발생:", error);
          showAlert({ message: "게시물 삭제에 실패했습니다." });
        }
      }
    });
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleIndicatorClick = (index: number) => {
    setSelectedImage(index);
  };
  return (
    <>
      <div className="xl:w-[864px] mx-auto">
        <div className="px-6 py-6 divide-y divide-grayoe-800">
          {!postData ? (
            <p>로딩중</p>
          ) : (
            <div className="flex flex-col gap-2 pb-6">
              <p className="font-h5 xl:font-h4">{postData.title}</p>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <img src={postData.profileImg || defaultImg} alt="" className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col justify-center items-start gap-1">
                    <p className="font-b2-semibold">{postData.nickname}</p>
                    <p className="font-c2 text-grayoe-300">{formatDate(postData.createdAt)}</p>
                  </div>
                </div>
                <div className="flex gap-2 justify-center items-end font-c2">
                  <div className="flex justify-center items-center gap-1">
                    <img src={show} alt="조회수" className="w-[14px] h-[14px]" />
                    <p>{postData.view}</p>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    <img src={commentIcon} alt="댓글아이콘" className="w-[14px] h-[14px]" />
                    <p>{totalComments}</p>
                  </div>
                  {user?.nickname === postData.nickname && (
                    <>
                      <img src={edit} alt="Edit icon" className="w-4 h-4 cursor-pointer" onClick={handleToggleMenu} />
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
                className={`pt-6 ${
                  postData.imageUrlList.length === 1
                    ? ""
                    : postData.imageUrlList.length === 2
                      ? "grid grid-rows-1 gap-2 pb-2 grid-cols-2"
                      : postData.imageUrlList.length === 3
                        ? "grid-rows-1 gap-2 pb-2 xl:grid-cols-3 xl:grid-rows-1"
                        : postData.imageUrlList.length === 4
                          ? "grid-rows-1 gap-2 pb-2 xl:grid-cols-2 xl:grid-rows-2"
                          : "grid-rows-1 gap-2 pb-2 xl:grid-cols-3 xl:grid-rows-2"
                } xl:grid xl:gap-2 xl:justify-center ${
                  postData.imageUrlList.length > 1 ? "overflow-x-auto scrollbar-hidden flex xl:grid" : ""
                }`}
              >
                {postData.imageUrlList.map((img: string, index: number) => (
                  <img
                    key={index}
                    src={img}
                    alt={`게시물 이미지 ${index + 1}`}
                    className={`w-full rounded-lg ${postData.imageUrlList.length === 1 ? "h-auto" : postData.imageUrlList.length === 2 ? "w-full h-[180px] xl:h-[240px]" : "w-[162px] xl:w-full h-[180px] xl:h-[180px]"} `}
                    onClick={() => handleImageClick(index)}
                  />
                ))}
              </div>
            )}

            {isModalOpen && postData && selectedImage !== null && (
              <>
                <div
                  className="fixed top-0 left-0 w-full h-full z-10 bg-black "
                  onClick={() => setIsModalOpen(false)}
                />
                <button className="fixed top-[80px] left-4 text-white text-2xl z-30" onClick={handleCloseModal}>
                  ✕
                </button>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto flex flex-col items-center justify-center z-20">
                  <div>
                    <img
                      src={postData.imageUrlList[selectedImage]}
                      alt="확대된 이미지"
                      className="max-w-full max-h-screen rounded-lg"
                    />
                  </div>

                  {postData.imageUrlList.length > 1 && (
                    <div className="flex gap-2 mt-4">
                      {postData.imageUrlList.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 rounded-full ${index === selectedImage ? "bg-white" : "bg-gray-400"}`}
                          onClick={() => handleIndicatorClick(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
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
