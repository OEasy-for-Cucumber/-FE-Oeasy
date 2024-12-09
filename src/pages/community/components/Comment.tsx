import edit from "../../../../public/icons/moreIcon.png";
import { formatDistanceToNow, parseISO, format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../zustand/authStore";
import instance from "../../../api/axios";
import Pagination from "./Pagination";
import useConfirm from "../../../hooks/useConfirm";
import useAlert from "../../../hooks/useAlert";

interface CmnProps {
  communityId: number;
  setTotalComments: (count: number) => void;
}

interface Comment {
  memberId: number;
  profileImg: string;
  nickname: string;
  content: string;
  createTime: string;
  commentPk: number;
}

function Comment({ communityId, setTotalComments }: CmnProps) {
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useUserStore((state) => state.user);
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [commentContent, setCommentContent] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const [editContent, setEditContent] = useState<string>("");
  const { showConfirm } = useConfirm();
  const { showAlert } = useAlert();

  const fetchComments = async (page: number) => {
    try {
      const response = await instance.get(`/api/community/comment`, {
        params: {
          communityPk: communityId,
          page: page - 1,
          size: 5
        }
      });
      const { contents, totalPages, totalElements } = response.data;
      setComments(contents.reverse());
      setTotalPages(totalPages);
      setTotalComments(totalElements);
    } catch (error) {
      console.error("댓글을 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchComments(currentPage);
    window.scrollTo({
      top: document.body.scrollHeight
    });
  }, [communityId, currentPage]);

  function formatDate(dateString: string): string {
    const cleanedDateString = dateString.split(".")[0];
    const date = parseISO(cleanedDateString);
    const now = new Date();

    const differenceInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (differenceInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true, locale: ko });
    } else {
      return format(date, "yy.MM.dd");
    }
  }

  const handleToggleMenu = (commentPk: number) => {
    setShowMenu((prevPk) => (prevPk === commentPk ? null : commentPk));
  };

  const handleSendComment = async () => {
    if (isSending) return;
    if (!commentContent.trim) {
      showAlert({
        message: "댓글을 입력해주세요"
      });
      return;
    }
    setIsSending(true);
    const requestComment = {
      communityId,
      memberId: user?.memberPk,
      content: commentContent,
      size: 5
    };

    try {
      await instance.post(`/api/community/comment`, requestComment);
      setCommentContent("");
      await fetchComments(currentPage);
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleEdit = (commentPk: number, content: string) => {
    setEditingComment(commentPk);
    setEditContent(content);
    setShowMenu(null);
  };

  const handleEditSubmit = async (commentPk: number) => {
    const prevComment = comments.find((comment) => comment.commentPk === commentPk);

    if (prevComment?.content === editContent.trim()) {
      showAlert({
        message: "변경된 내용이 없습니다"
      });
      return;
    }
    if (!editContent.trim()) {
      showAlert({
        message: "수정할 내용을 입력해주세요."
      });
      return;
    }

    const requestEdit = {
      memberId: user?.memberPk,
      commentId: commentPk,
      content: editContent
    };

    try {
      await instance.patch("/api/community/comment", requestEdit);

      showAlert({
        message: "댓글이 수정되었습니다."
      });
      setEditingComment(null);
      await fetchComments(currentPage);
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
      showAlert({
        message: "댓글 수정에 실패했습니다."
      });
    }
  };
  const handleDelete = async (commentPk: number) => {
    showConfirm({
      message: "댓글을 삭제할까요?",
      onConfirm: async () => {
        const requestDelete = {
          memberId: user?.memberPk,
          commentId: commentPk
        };

        try {
          await instance.delete("/api/community/comment", {
            data: requestDelete
          });

          showAlert({ message: "댓글이 삭제되었습니다." });
          await fetchComments(currentPage);
        } catch (error) {
          console.error("댓글 삭제 중 오류 발생:", error);
          alert("댓글 삭제에 실패했습니다.");
        }
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, commentPk: number) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEditSubmit(commentPk);
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <p className="pb-6 font-b1-semibold">댓글</p>
        <div className="divide-y divide-grayoe-800">
          {comments.map((com) => (
            <div key={com.commentPk} className="flex justify-between pt-4">
              <div className="flex gap-2">
                <img
                  src={com.profileImg ?? "/img/defaultProfile.png"}
                  alt="프로필이미지"
                  className="w-6 h-6 rounded-full"
                />
                <div className="flex flex-col gap-[2px] mb-4">
                  <p className="font-b2-semibold xl:font-b1-semibold">{com.nickname}</p>
                  {editingComment === com.commentPk ? (
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, com.commentPk)}
                      className="w-[400px] xl:w-[630px] bg-grayoe-950 p-2 border font-b2-regular xl:font-b1-regular border-grayoe-600 rounded resize-none focus:outline-none"
                    />
                  ) : (
                    <p className="font-b2-regular xl:font-b1-regular">{com.content}</p>
                  )}
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
                    onClick={() => handleToggleMenu(com.commentPk)}
                  />
                  {showMenu === com.commentPk && (
                    <div className="absolute top-6 right-0 w-14 font-c2 bg-grayoe-400 rounded-md shadow-lg flex flex-col">
                      <button className="py-2 px-4  rounded" onClick={() => handleEdit(com.commentPk, com.content)}>
                        수정
                      </button>
                      <button className="py-2 px-4  rounded" onClick={() => handleDelete(com.commentPk)}>
                        삭제
                      </button>
                    </div>
                  )}
                  {editingComment === com.commentPk && (
                    <button className="mt-2  font-bold" onClick={() => handleEditSubmit(com.commentPk)}>
                      저장
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full px-4 py-2 bg-grayoe-400 rounded-md h-[116px]  flex flex-col justify-between gap-1">
          <p className="mt-1 font-b2-semibold xl:font-b1-semibold">{user?.nickname}</p>
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="w-full mt-1 h-auto font-b2-regular xl:font-b1-regular focus:outline-none bg-grayoe-400 placeholder-grayoe-200 resize-none"
            placeholder="댓글을 입력해주세요."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendComment();
              }
            }}
          />
          <div className="flex justify-end">
            <button
              onClick={handleSendComment}
              disabled={isSending || !commentContent.trim()}
              className={`w-11 h-7 font-b2-regular xl:font-b1-regular text-${commentContent.trim() ? "greenoe-600" : "grayoe-200"} rounded-md flex justify-center items-center `}
            >
              등록
            </button>
          </div>
        </div>
        <div>
          {comments.length > 0 && (
            <div className="w-full flex justify-center">
              <Pagination totalPageNumber={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Comment;
