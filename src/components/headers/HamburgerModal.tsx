import { useNavigate } from "react-router-dom";
import Xicon from "../../../public/icons/Icon.png";
import ReactDOM from 'react-dom'; 

function HamburgerModal({ toggleModal, setIsModalOpen }: { toggleModal: boolean; onClose: () => void; setIsModalOpen: (value:boolean) => void;}) {
  const navigate = useNavigate();

  const goToCommunity = () => {
    navigate("/community");
    setIsModalOpen(false);
  }

  const goToVote = () => {
    navigate("/vote-chat")
    setIsModalOpen(false);
  }

  const goToRecipes = () => {
    navigate("/recipe")
    setIsModalOpen(false);
  }

  const closeHandler = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      {toggleModal &&
        ReactDOM.createPortal(
          <div className="w-full min-w-[360px] max-w-[500px] mx-auto fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-grayoe-950 p-6 w-full h-screen">
              <button
                className="text-white text-2xl absolute top-3 right-6"
                onClick={closeHandler}
              >
                <img src={Xicon} alt="닫기버튼" />
              </button>
              <div className="text-grayoe-400 text-2xl mt-[88px]">
                <button onClick={goToCommunity} className="hover:text-white pb-2">
                  오이 커뮤니티
                </button>
                <br />
                <hr className="border-grayoe-900 py-1" />
                <button onClick={goToVote} className="hover:text-white pb-2">
                  오이 투표
                </button>
                <br />
                <hr className="border-grayoe-900 py-1" />
                <button onClick={goToRecipes} className="hover:text-white">
                  오이 레시피
                </button>
              </div>
            </div>
          </div>,
          document.body // `body` 태그에 모달을 렌더링
        )}
    </>
  );
}

export default HamburgerModal;
