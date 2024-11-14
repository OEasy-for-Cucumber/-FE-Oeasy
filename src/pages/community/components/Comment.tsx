import edit from "../../../../public/icons/moreIcon.png";
import sendIcon from "../../../../public/icons/send.png";
import { formatDistanceToNow, parseISO, format } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { useUserStore } from "../../../zustand/authStore";

function Comment() {
  const [showEdit, setShowEdit] = useState<number | null>(null);
  const user = useUserStore((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      nickname: "오이좋아현",
      profileImg: "../../../../public/img/defaultProfile.png",
      date: "2024-11-12T20:00:00",
      comment: "우와 신기하다"
    },
    {
      id: 2,
      nickname: "마라탕러버",
      profileImg: "../../../../public/img/defaultProfile.png",
      date: "2024-11-12T12:00:00",
      comment: "좋은 정보 얻어갑니당"
    },
    {
      id: 3,
      nickname: "오이조아조앙",
      profileImg: "../../../../public/img/defaultProfile.png",
      date: "2024-11-12T12:00:00",
      comment: "40일만에?? 우왕"
    },
    {
      id: 4,
      nickname: "Hatecucumber",
      profileImg: "../../../../public/img/defaultProfile.png",
      date: "2024-11-12T12:00:00",
      comment: "으악 극혐"
    }
  ]);

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

  const handleSendComment = () => {
    if (comment.trim() === "") {
      alert("댓글을 입력해주세요.");
      return;
    }

    const newComment = {
      id: comments.length + 1,
      nickname: user?.nickname || "익명",
      profileImg: "../../../../public/img/defaultProfile.png",
      date: new Date().toISOString(),
      comment: comment.trim()
    };

    setComments([...comments, newComment]);
    setComment("");
  };
  return (
    <>
      <div className="flex flex-col">
        <p className="pb-6 font-b1-semibold">댓글</p>
        <div className="divide-y divide-grayoe-800">
          {comments.map((com, index) => (
            <div key={index} className="flex justify-between pt-4 ">
              <div className="flex gap-2">
                <img src={com.profileImg} alt="" className="w-6 h-6" />
                <div className="flex flex-col gap-[2px] mb-4">
                  <p className="font-b2-semibold">{com.nickname}</p>
                  <p className="font-b2-regular">{com.comment}</p>
                  <p className="font-c2 text-grayoe-300">{formatDate(com.date)}</p>
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
          ))}
        </div>
        <div className=" w-full h-[52px] mx-auto px-4 py-2 bottom-0">
          <div className="relative w-auto xl:w-[456px]">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력해주세요"
              className="w-full h-9 p-2 pl-6 pr-14 rounded-full focus:outline-none bg-grayoe-400 placeholder-grayoe-200"
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
