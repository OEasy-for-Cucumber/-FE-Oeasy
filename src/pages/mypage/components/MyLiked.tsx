
function MyLiked() {
  return (
    <div className="w-full my-5 px-6">
      <div className="text-center">좋아요한 게시글이 없습니다.</div>
      
      <div className="w-full border-b py-4">
        <div className="flex flex-col">
          <p>24.08.23</p>
          <p>오이가 세상을 구한다</p>

          <div className="flex">
            <p>좋아요수</p>
            <p>조회수</p>
            <p>댓글 수</p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default MyLiked