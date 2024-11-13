import defaultImg from "../../../../public/img/defaultProfile.png";

function Comment() {
  return (
    <>
      <div className="flex flex-col">
        <p className="pb-6 font-b1-semibold">댓글</p>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <img src={defaultImg} alt="" className="w-6 h-6" />
            <div className="flex flex-col gap-[2px]">
              <p className="font-b2-semibold">닉네임</p>
              <p>내용</p>
              <p>시간</p>
            </div>
          </div>
          <p>수정아이콘</p>
        </div>
      </div>
    </>
  );
}

export default Comment;
