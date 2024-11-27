import { formatDistanceToNow, parseISO, format } from "date-fns";
import { ko } from "date-fns/locale";
import defaultImg from "../../../../public/img/defaultOe.png";
import postHeart from "../../../../public/icons/heart.png";
import commentIcon from "../../../../public/icons/comment.png";
import filter from "../../../../public/icons/filterIcon.png";
import search from "../../../../public/icons/Search.png";

import { Link } from "react-router-dom";
import { useState } from "react";
import Search from "./Search";

const generateId = () => `${Date.now()}-${Math.random().toString(36)}`;

function List() {
  // const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const posts = [
    {
      id: generateId(),
      title: "제목",
      nickname: "오이좋아현",
      date: "2024-11-12T12:00:00",
      likes: 10,
      comments: 2,
      images: ["../../../../public/img/cuteOE.png", "../../../../public/img/defaultOe.png"]
    },
    {
      id: generateId(),
      title: "제목이 두줄인 경우는 이렇게 보입니다 제목이 두줄인 경우는 이렇게 보입니다",
      nickname: "크림이는 오이싫어",
      date: "2024-11-12T12:00:00",
      likes: 5,
      comments: 1,
      images: ["../../../../public/img/postFakeImg.png"]
    },
    {
      id: generateId(),
      title:
        "제목이 세줄이상인 경우는 이렇게 보입니다 제목이 세줄이상인 경우는 이렇게 보입니다 제목이 세줄이상인 경우는 이렇게 보입니다",
      nickname: "오이불호",
      date: "2024-11-12T20:00:00",
      likes: 5,
      comments: 1,
      images: []
    },
    {
      id: generateId(),
      title:
        "제목이 세줄이상인 경우는 이렇게 보입니다 제목이 세줄이상인 경우는 이렇게 보입니다 제목이 세줄이상인 경우는 이렇게 보입니다",
      nickname: "오이불호",
      date: "2024-04-18T20:00:00",
      likes: 5,
      comments: 1,
      images: [
        "../../../../public/img/cuteOE.png",
        "../../../../public/img/defaultOe.png",
        "../../../../public/img/cuteOE.png"
      ]
    },
    {
      id: generateId(),
      title: "오이 솔직히 왜 싫어하십니까?",
      nickname: "오이셀럽",
      date: "2024-11-13T15:00:00",
      likes: 234,
      comments: 200,
      images: [
        "../../../../public/img/cuteOE.png",
        "../../../../public/img/defaultOe.png",
        "../../../../public/img/postFakeImg.png",
        "../../../../public/img/postFakeImg.png"
      ]
    },
    {
      id: generateId(),
      title: "오이소박이 레시피 공유해드립니다",
      nickname: "오이소박이",
      date: "2024-11-13T19:00:00",
      likes: 214,
      comments: 143,
      images: []
    }
  ];

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
  return (
    <>
      {showSearch ? (
        <Search />
      ) : (
        <div className="px-6 xl:w-[767px] mx-auto mt-1">
          <div className="flex justify-between items-center font-c2">
            <div className="flex gap-1">
              <img src={filter} alt="필터아이콘" className="w-[14px] h-[14px]" />
              <p className="font-c2 xl:font-c1">인기순</p>
            </div>
            <div className="flex gap-2">
              {/* Toggle Search component */}
              <div
                className="w-8 h-8 p-2 border border-grayoe-400 rounded-md bg-grayoe-900 cursor-pointer"
                onClick={() => setShowSearch(true)}
              >
                <img src={search} alt="검색" />
              </div>
              <Link to="/community/upload">
                <button className="w-14 h-8 xl:w-16 font-c2 xl:font-c1 rounded-[4px] bg-grayoe-400 px-3 py-2 ">
                  글쓰기
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col divide-y divide-grayoe-800">
            {posts.map((post, index) => (
              <div key={index} className="flex justify-between py-4 gap-2">
                <div className="flex flex-col gap-[8px] flex-[8.5]">
                  <div className="truncate-title font-b2-semibold xl:font-b1-semibold cursor-pointer">{post.title}</div>
                  <div className="flex gap-2 font-c2 xl:font-c1">
                    <p className="text-grayoe-300">
                      {post.nickname} ・ {formatDate(post.date)}
                    </p>

                    <div className="flex justify-center items-center gap-1">
                      <img src={postHeart} alt="빈하트" className="w-[14px] h-[14px]" />
                      <p>{post.likes}</p>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <img src={commentIcon} alt="댓글아이" className="w-[14px] h-[14px]" />
                      <p>{post.comments}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-[1.5] justify-start items-end cursor-pointer">
                  {post.images.length > 0 ? (
                    <img
                      className="w-[48px] h-[48px] xl:w-[56px] xl:h-[56px] rounded-md"
                      src={post.images[0]}
                      alt="post 첫번째 이미지"
                    />
                  ) : (
                    <img
                      className="w-[48px] h-[48px] xl:w-[56px] xl:h-[56px] rounded-md"
                      src={defaultImg}
                      alt="기본 이미지"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default List;
