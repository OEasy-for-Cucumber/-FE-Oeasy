import { useUserStore } from "../../zustand/authStore";
import { useState } from "react";
import EditProfile from "./components/EditProfile";
import MyPost from "./components/MyPost";
import MyLiked from "./components/MyLiked";

function MyPage() {
  const { user } = useUserStore.getState();

  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(true);

  const handleEditModal = () => {
    setEditModalOpen((prev) => !prev);
  };

  const handlePostClicked = () => setIsClicked(true);
  const handleLikedClicked = () => setIsClicked(false);
  
  return (
    <div>
      <div className="flex p-4 bg-grayoe-900 rounded-lg items-center my-6 mx-4">
        <div className="w-full flex items-center">
          <div className="w-[48px] h-[48px] rounded-full bg-profile_sample bg-cover text-black"></div>
          <h6 className="font-h6 ml-2">{user?.nickname}</h6>
        </div>
        <button onClick={handleEditModal} className="h-[32px] px-3 whitespace-nowrap bg-grayoe-400 rounded font-c2">
          계정 설정
        </button>
      </div>
      {isEditModalOpen && <EditProfile handleEditModal={handleEditModal} />}

      <div className="w-full flex mt-[50px]">
        <button
          onClick={handlePostClicked}
          className={`w-1/2 p-2 border-b-2 ${!isClicked ? "border-grayoe-950" : "border-greenoe-600"} text-center`}
        >
          게시글
        </button>
        <button
          onClick={handleLikedClicked}
          className={`w-1/2 p-2 border-b-2 ${isClicked ? "border-grayoe-950" : "border-greenoe-600"} text-center`}
        >
          좋아요
        </button>
      </div>
      {isClicked ? <MyPost /> : <MyLiked />}
    </div>
  );
}

export default MyPage;
