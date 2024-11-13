import { useLocation } from "react-router-dom";
import profileImg from "../../../../../public/img/profilesample.jpg";
import show from "../../../../../public/icons/show.png";
import commentIcon from "../../../../../public/icons/comment.png";
import fullHeart from "../../../../../public/icons/fullHeart.png";
import Comment from "../../components/Comment";

interface Post {
  title: string;
  nickname: string;
  postDate: string;
  likes: number;
  comments: number;
  images: string[];
}

function Detail() {
  const location = useLocation();
  const post = location.state as Post;
  return (
    <>
      <div className="px-6 py-6 divide-y divide-grayoe-800">
        <div className="flex flex-col gap-2 pb-6">
          <p className="font-h5">{post.title}</p>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <img src={profileImg} alt="" className="w-10 h-10 rounded-full" />
              <div className="flex flex-col justify-center items-start gap-1">
                <p className="font-b2-semibold">{post.nickname}</p>
                <p className="font-c2 text-grayoe-300">{post.postDate}</p>
              </div>
            </div>
            <div className="flex gap-2 justify-center items-end font-c2">
              <div className="flex justify-center items-center gap-1">
                <img src={show} alt="조회수" className="w-[14px] h-[14px]" />
                <p>{post.likes}</p>
              </div>
              <div className="flex justify-center items-center gap-1">
                <img src={commentIcon} alt="댓글아이" className="w-[14px] h-[14px]" />
                <p>{post.comments}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <p>
            촉성재배는 정식 후 약 40일이면 수확이 시작되는데, 개화에서 수확까지 초기에는 15∼18일, 중ㆍ후기에는 10∼15일
            걸린다. 반촉성재배는 정식 후 약 35∼40일이 되어야 수확이 시작되는데, 초기에는 13∼17일, 중후기에는 8∼13일된
            과실을 수확한다.
          </p>
          {post.images && post.images.length > 0 && (
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
                  className={`w-full rounded-sm ${post.images.length === 1 ? "h-[200px]" : "h-[180px]"} ${
                    post.images.length === 3 && index === 0 ? "col-span-2" : ""
                  }`}
                />
              ))}
            </div>
          )}

          <div className="flex justify-start items-center gap-1 pt-6">
            <img src={fullHeart} alt="찬하트" className="w-[15px] h-[15px]" />
            <p className="font-b2-regular">{post.likes}</p>
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