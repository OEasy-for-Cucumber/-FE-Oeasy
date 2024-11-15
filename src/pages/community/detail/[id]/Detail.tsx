import { useLocation } from "react-router-dom";
import profileImg from "../../../../../public/img/profilesample.jpg";
import show from "../../../../../public/icons/show.png";
import commentIcon from "../../../../../public/icons/comment.png";
import emptyHeart from "../../../../../public/icons/heart.png";
import fullHeart from "../../../../../public/icons/fullHeart.png";
import Comment from "../../components/Comment";
import { useState } from "react";
import { parseISO, format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface Post {
  title: string;
  nickname: string;
  postDate: string;
  likes: number;
  comments: number;
  images: string[];
}

interface PostData {
  content: string;
  title: string;
  user: {
    nickname: string;
  };
  createdAt: string;
  images: Array<string>;
}

function Detail() {
  const location = useLocation();
  const post = location.state as Post;
  const postData = location.state as PostData;
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(0);

  console.log(postData);

  const toggleLike = () => {
    setLiked(!liked);
    setLikedCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

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

  return (
    <>
      <div className="px-6 py-6 divide-y divide-grayoe-800">
        <div className="flex flex-col gap-2 pb-6">
          <p className="font-h5">{postData.title}</p>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <img src={profileImg} alt="" className="w-10 h-10 rounded-full" />
              <div className="flex flex-col justify-center items-start gap-1">
                <p className="font-b2-semibold">{postData.user.nickname}</p>
                <p className="font-c2 text-grayoe-300">{formatDate(postData.createdAt)}</p>
              </div>
            </div>
            <div className="flex gap-2 justify-center items-end font-c2">
              <div className="flex justify-center items-center gap-1">
                <img src={show} alt="조회수" className="w-[14px] h-[14px]" />
                <p>조회수</p>
              </div>
              <div className="flex justify-center items-center gap-1">
                <img src={commentIcon} alt="댓글아이콘" className="w-[14px] h-[14px]" />
                <p>댓글수</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <p>{postData.content}</p>
          {postData.images && post.images.length > 0 && (
            <div
              className={`min-h-[204px] max-h-[392px] gap-2 justify-center pt-6 ${
                post.images.length === 1
                  ? "grid-cols-1"
                  : post.images.length === 3
                    ? "grid-cols-2 grid-rows-2"
                    : "grid-cols-2 place-items-center"
              } grid`}
            >
              {post.images.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`게시물 이미지 ${index + 1}`}
                  className={`w-full rounded-lg ${post.images.length === 1 ? "h-[200px]" : "h-[180px]"} ${
                    post.images.length === 3 && index === 0 ? "col-span-2" : ""
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
        <Comment />
      </div>
    </>
  );
}

export default Detail;
