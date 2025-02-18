import { useState } from "react";
import EditProfile from "./components/EditProfile";
import MyPost from "./components/MyPost";
import MyLiked from "./components/MyLiked";
import Sample from "@/assets/img/defaultProfile.webp";
import { useUserStore } from "@/zustand/authStore";

function MyPage() {
  const user = useUserStore((state) => state.user);

  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(true);

  const handleEditModal = () => {
    setEditModalOpen((prev) => !prev);
  };

  const handlePostClicked = () => setIsClicked(true);
  const handleLikedClicked = () => setIsClicked(false);

  return (
    <div className="w-full xl:w-[688px] mx-auto h-svh">
      <p className="hidden xl:flex font-h3 mx-4">마이페이지</p>
      <div className="flex p-4 bg-grayoe-900 rounded-lg items-center my-6 mx-4 xl:mx-0">
        <div className="w-full flex items-center">
          <img
            src={!user?.memberImage ? Sample : user?.memberImage}
            alt="프로필이미지"
            className="w-[48px] h-[48px] rounded-full"
          />
          <h6 className="font-h6 ml-2">{user?.nickname}</h6>
        </div>
        <button
          onClick={handleEditModal}
          className="h-[32px] px-3 whitespace-nowrap bg-grayoe-400 hover:bg-grayoe-700 duration-150 rounded font-c2"
        >
          계정 설정
        </button>
      </div>
      {isEditModalOpen && <EditProfile handleEditModal={handleEditModal} />}

      <div className="w-full flex mt-6">
        <button
          onClick={handlePostClicked}
          className={`w-1/2 p-3 border-b-2 ${!isClicked ? "border-grayoe-900 text-grayoe-400" : "border-greenoe-600"} text-center text-[14px]`}
        >
          게시글
        </button>
        <button
          onClick={handleLikedClicked}
          className={`w-1/2 p-2 border-b-2 ${isClicked ? "border-grayoe-900 text-grayoe-400" : "border-greenoe-600"} text-center text-[14px]`}
        >
          좋아요
        </button>
      </div>
      {isClicked ? <MyPost /> : <MyLiked />}
    </div>
  );
}

export default MyPage;
