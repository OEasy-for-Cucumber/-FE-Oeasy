import defaultImg from "../../../../public/img/defaultOe.png";
function List() {
  const posts = [
    {
      title: "제목",
      nickname: "오이좋아현",
      date: "2024-11-12",
      likes: 10,
      comments: 2,
      image: "../../../../public/img/귀여운행복오이.png"
    },
    {
      title: "제목이 두줄인 경우는 이렇게 보입니다 제목이 두줄인 경우는 이렇게 보입니다",
      nickname: "크림이는 오이싫어",
      date: "2024-11-11",
      likes: 5,
      comments: 1,
      image: "../../../../public/img/귀여운행복오이.png"
    },
    {
      title:
        "제목이 세줄이상인 경우는 이렇게 보입니다 제목이 세줄이상인 경우는 이렇게 보입니다 제목이 세줄이상인 경우는 이렇게 보입니다",
      nickname: "오이불호",
      date: "2024-11-11",
      likes: 5,
      comments: 1,
      image: ""
    }
  ];
  return (
    <>
      <div>
        <div className="flex justify-between">
          <p>인기순</p>
          <button className="w-14 h-8 font-c2 rounded-lg bg-grayoe-600 px-3 py-2 ">글쓰기</button>
        </div>
        <div className="flex flex-col divide-y divide-grayoe-600">
          {posts.map((post, index) => (
            <div key={index} className="flex justify-between py-4 px-6 gap-2">
              <div className="flex flex-col gap-[8px] flex-[8.5]">
                <p className="truncate-title">{post.title}</p>
                <div className="flex gap-2">
                  <p className="text-grayoe-300">{post.nickname}</p>
                  <p className="text-grayoe-300">{post.date}</p>
                  <p>좋아요{post.likes}</p>
                  <p>댓글{post.comments}</p>
                </div>
              </div>
              <div className="flex flex-col flex-[1.5] justify-start items-end">
                {post.image ? (
                  <div>
                    <img className="w-[48px] h-[48px]" src={post.image} alt="post 이미지" />
                  </div>
                ) : (
                  <div>
                    <img className="w-[48px] h-[48px]" src={defaultImg} alt="기본 이미지" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default List;
