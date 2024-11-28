import edit from "../../../../public/icons/moreIcon.png";
import sendIcon from "../../../../public/icons/send.png";
import { formatDistanceToNow, parseISO, format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../zustand/authStore";
import instance from "../../../api/axios";

interface CmnProps {
  communityId: number;
}

interface Comment {
  id: number;
  profileImg: string;
  nickname: string;
  content: string;
  createdAt: string;
}

function Comment({ communityId }: CmnProps) {
  const [showEdit, setShowEdit] = useState<number | null>(null);
  const user = useUserStore((state) => state.user);
  const [comments, setComments] = useState<Comment[]>([]);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const fetchComments = async () => {
    try {
      const response = await instance.get(`/api/community/comment`, {
        params: {
          communityPk: communityId,
          page: 0,
          size: 10
        }
      });
      setComments(response.data || []);
    } catch (error) {
      console.error("댓글을 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [communityId]);

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
  const handleToggleMenu = (id: number) => {
    setShowEdit((prevId) => (prevId === id ? null : id));
  };

  const handleSendComment = async () => {
    const content = commentRef.current?.value || "";
    if (!content) {
      alert("댓글을 입력해주세요.");
      return;
    }
    const requestComment = {
      communityId,
      memberId: user?.memberPk,
      content,
      size: 10
    };

    try {
      const response = await instance.post(`/api/community/comment`, requestComment);
      if (commentRef.current) {
        commentRef.current.value = ""; // 입력 필드 초기화
      }
      // fetchComments();
      console.log(response);
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
      alert("댓글 등록에 실패했습니다. 다시 시도해주세요.");
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
                  <img src={com.profileImg} alt="" className="w-6 h-6" />
                  <div className="flex flex-col gap-[2px] mb-4">
                    <p className="font-b2-semibold">{com.nickname}</p>
                    <p className="font-b2-regular">{com.content}</p>
                    {/* <p className="font-c2 text-grayoe-300">{formatDate(com.date)}</p> */}
                  </div>
                </div>
                <div className="flex flex-col items-end font-c2">
                  <img
                    src={edit}
                    alt="Edit icon"
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => handleToggleMenu(com.id)}
                  />
                  {showEdit === com.id && (
                    <div className="w-[45px] h-14 bg-grayoe-400 rounded-md flex flex-col justify-center items-center">
                      <p className="py-[6px] cursor-pointer">수정</p>
                      <p className="py-[6px] cursor-pointer">삭제</p>
                    </div>
                  )}
                </div>
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
              className="w-full h-9 p-2 pl-6 pr-14 rounded-full focus:outline-none bg-grayoe-400 placeholder-grayoe-200"
              placeholder="내용을 입력하세요."
            />
            <button
              onClick={handleSendComment}
              className="absolute right-1 top-1 bottom-1 w-11 h-7 bg-greenoe-600 text-white rounded-full flex items-center justify-center"
            >
              <img src={sendIcon} alt="Send" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
