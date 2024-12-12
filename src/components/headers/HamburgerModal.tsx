import { useLocation, useNavigate } from "react-router-dom";
import Xicon from "../../../public/icons/Icon.webp";
import ReactDOM from "react-dom";

function HamburgerModal({
  toggleModal,
  setIsModalOpen
}: {
  toggleModal: boolean;
  onClose: () => void;
  setIsModalOpen: (value: boolean) => void;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goToHome = () => {
    navigate("/");
    setIsModalOpen(false);
  };

  const goToCommunity = () => {
    navigate("/community");
    setIsModalOpen(false);
  };

  const goToVote = () => {
    navigate("/vote-chat");
    setIsModalOpen(false);
  };

  const goToRecipes = () => {
    navigate("/recipe");
    setIsModalOpen(false);
  };

  const closeHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {toggleModal &&
        ReactDOM.createPortal(
          <div className="w-full min-w-[360px] max-w-[520px] xl:hidden  mx-auto fixed inset-0 flex items-center justify-center z-50">
            <div className={`${pathname !== "/" ? "bg-grayoe-950" : "bg-greenoe-950"} p-6 w-full h-screen`}>
              <button className="text-white text-2xl absolute top-3 right-6" onClick={closeHandler}>
                <img src={Xicon} alt="닫기버튼" />
              </button>
              <div className="text-grayoe-400 font-h4 mt-[90px]">
                <button onClick={goToHome} className="hover:text-white py-2">
                  홈
                </button>
                <hr className="border-grayoe-900" />
                <button onClick={goToCommunity} className="hover:text-white py-2">
                  오이 커뮤니티
                </button>
                <hr className="border-grayoe-900" />
                <button onClick={goToVote} className="hover:text-white py-2">
                  오이 투표
                </button>
                <hr className="border-grayoe-900" />
                <button onClick={goToRecipes} className="hover:text-white py-2">
                  오이 레시피
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default HamburgerModal;
