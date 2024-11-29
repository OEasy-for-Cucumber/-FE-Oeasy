import edit from "../../../../public/icons/moreIcon.png";
import sendIcon from "../../../../public/icons/send.png";
import { formatDistanceToNow, parseISO, format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../zustand/authStore";
import instance from "../../../api/axios";
import Pagination from "./Pagination";

interface CmnProps {
  communityId: number;
}

interface Comment {
  memberId: number;
  profileImg: string;
  nickname: string;
  content: string;
  createTime: string;
  commentPk: number;
}

function Comment({ communityId }: CmnProps) {
  const [showEdit, setShowEdit] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // useState로 currentPage 관리
  const user = useUserStore((state) => state.user);
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [isSending, setIsSending] = useState(false);

  const fetchComments = async (page: number) => {
    try {
      const response = await instance.get(`/api/community/comment`, {
        params: {
          communityPk: communityId,
          page: page - 1,
          size: 5
        }
      });
      console.log(response.data);
      const { contents, totalPages } = response.data;
      setComments(contents);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("댓글을 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchComments(currentPage);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  }, [communityId, currentPage]);

  function formatDate(dateString: string): string {
    // 밀리초 소수점 제거
    const cleanedDateString = dateString.split(".")[0]; // "2024-11-29T11:28:58"
    const date = parseISO(cleanedDateString); // ISO 8601 형식으로 변환
    const now = new Date();

    const differenceInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (differenceInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true, locale: ko });
    } else {
      return format(date, "yy.MM.dd");
    }
  }

  const handleToggleMenu = (commentPk: number) => {
    setShowEdit((prevPk) => (prevPk === commentPk ? null : commentPk));
  };

  const handleSendComment = async () => {
    if (isSending) return;
    const content = commentRef.current?.value || "";
    if (!content) {
      alert("댓글을 입력해주세요.");
      return;
    }
    setIsSending(true);
    const requestComment = {
      communityId,
      memberId: user?.memberPk,
      content,
      size: 5
    };

    try {
      const response = await instance.post(`/api/community/comment`, requestComment);
      console.log("Response:", response);
      if (commentRef.current) {
        commentRef.current.value = "";
      }

      await fetchComments(currentPage);
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
      alert("댓글 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <p className="pb-6 font-b1-semibold">댓글</p>
        <div className="divide-y divide-grayoe-800">
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((com, index) => (
              <div key={index} className="flex justify-between pt-4 ">
                <div className="flex gap-2">
                  <img
                    src={com.profileImg ?? "/img/defaultProfile.png"}
                    alt="프로필이미지"
                    className="w-6 h-6 rounded-full "
                  />
                  <div className="flex flex-col gap-[2px] mb-4">
                    <p className="font-b2-semibold xl:font-b1-semibold">{com.nickname}</p>
                    <p className="font-b2-regular xl:font-b1-regular">{com.content}</p>
                    <p className="font-c2 text-grayoe-300">
                      {com.createTime ? formatDate(com.createTime) : "날짜 정보 없음"}
                    </p>
                  </div>
                </div>
                {user?.memberPk === com.memberId && (
                  <div className="flex flex-col items-end font-c2 relative">
                    <img
                      src={edit}
                      alt="Edit icon"
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleToggleMenu(com.commentPk)} // 댓글 ID로 토글
                    />
                    {showEdit === com.commentPk && (
                      <div className="absolute top-6 right-0 w-14 h-16 bg-grayoe-400 rounded-md flex flex-col justify-center items-center shadow-lg">
                        <p className="py-2 cursor-pointer  rounded">수정</p>
                        <p className="py-2 cursor-pointer  rounded">삭제</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>댓글이 없습니다.</p>
          )}
        </div>
        <div className=" w-full h-[52px] mx-auto px-4 py-2 bottom-0">
          <div className="relative w-auto xl:w-[456px]">
            <textarea
              ref={commentRef}
              className="w-full h-9 pl-6 pr-14 py-2 rounded-full focus:outline-none bg-grayoe-400 placeholder-grayoe-200"
              placeholder="내용을 입력하세요."
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSendComment}
              className="absolute right-1 top-1 bottom-1 w-11 h-7 bg-greenoe-600 text-white rounded-full flex items-center justify-center"
            >
              <img src={sendIcon} alt="Send" className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Pagination totalPageNumber={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </>
  );
}

export default Comment;
