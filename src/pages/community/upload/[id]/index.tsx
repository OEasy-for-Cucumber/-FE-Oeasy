function Upload() {
  return (
    <>
      <div>
        <div className="flex justify-between py-4 px-6">
          <p className="font-h5">글쓰기</p>
          <button className="w-14 h-8 font-c2 rounded-[4px] bg-grayoe-400 px-3 py-2 ">등록</button>
        </div>
        <div className="border-grayoe-900 border-4 w-full xl:hidden" />
        <div className="flex flex-col justify-center items-start font-b2-regular">
          <textarea className="w-full h-auto py-4 px-6 bg-grayoe-950 outline-none" placeholder="제목을 입력하세요." />
          <textarea
            className="w-full min-h-[240px] py-4 px-6 bg-grayoe-950 outline-none"
            placeholder="내용을 입력하세요."
          />
        </div>
        <div className="border-grayoe-900 border-4 w-full xl:hidden" />
        <div className="px-6 py-4">
          <p className="font-b2-regular">이미지 첨부</p>
          <div>이미지 첨부하는부분</div>
        </div>
      </div>
    </>
  );
}

export default Upload;
