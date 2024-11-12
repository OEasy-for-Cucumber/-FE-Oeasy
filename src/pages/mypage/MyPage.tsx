import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../zustand/authStore";
import instance from "../../api/axios";
import { useState } from "react";
import EditProfile from "./components/EditProfile";

function MyPage() {
  const { user, setUser } = useUserStore.getState();
  const navigate = useNavigate();

  const [ isEditModalOpen, setEditModalOpen ] = useState<boolean>(false);
  const [ isClicked, setIsClicked ] = useState<boolean>(false);

  const getUserData = async () => {
    const token = getCookie("accessToken"); // 쿠키에서 토큰을 가져오는 함수
    if (!token) {
      console.error("토큰이 없습니다. 로그인 후 다시 시도하세요.");
      return;
    }

    try {
      const response = await instance.get("/member/profile", {
        withCredentials: true,
      });
      setUser(response.data); // 상태에 사용자 데이터 설정
      console.log("회원 정보:", response.data);
    } catch (error) {
      console.error("회원 정보 조회 실패:", error);
    }
  };
  
  // 쿠키에서 특정 이름의 값을 추출하는 함수
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };
  
  getUserData();

  const handleEditModal = () => {
    setEditModalOpen((prev)=>!prev);
  }

  const handlePostClicked = () => setIsClicked(true);
  const handleLikedClicked = () => setIsClicked(false);
  

  return (
    <div>
      <div className="w-full flex p-4 bg-grayoe-900 rounded-lg items-center my-6">
        <div className="w-full flex items-center">
          <div className="w-[48px] h-[48px] rounded-full bg-profile_sample bg-cover text-black">
          </div>
          <h6 className="font-h6 ml-2">닉네임</h6>
        </div>
        <button onClick={handleEditModal} className="h-[32px] px-3 whitespace-nowrap bg-grayoe-400 rounded font-c2">계정 설정</button>
      </div>
      {isEditModalOpen && <EditProfile handleEditModal={handleEditModal}/>}

      <div className="w-full flex mt-[50px]">
        <button onClick={handlePostClicked} className={`w-1/2 p-2 border-b-2 ${isClicked ? "border-greenoe-600" : "border-grayoe-950"} text-center`}>게시글</button>
        <button onClick={handleLikedClicked} className={`w-1/2 p-2 border-b-2 ${!isClicked ? "border-greenoe-600" : "border-grayoe-950"} text-center`}>좋아요</button>
      </div>
    </div>
  );
}

export default MyPage;
