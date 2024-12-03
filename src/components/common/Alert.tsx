interface AlertProps {
  isVisible: boolean;
  message: string;
  subMessage?: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ isVisible, message, subMessage, onClose }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-start bg-grayoe-950 bg-opacity-[0.8]">
      <div className="bg-grayoe-900 py-4 px-2 xl:py-6 xl:px-4 rounded-lg xl:rounded-2xl shadow-lg w-[200px] h-auto xl:w-[280px]  text-white text-center mt-16 xl:mt-20">
        <p className="font-b1-regular xl:font-h5  mb-2">{message}</p>
        {subMessage && <p className="mb-8 font-c2 xl:font-b2-regular">{subMessage}</p>}
        <button
          onClick={onClose}
          className="bg-greenoe-600 my-1 xl:my-2 w-[70px] h-[30px] xl:w-[100px] xl:h-[40px] font-c2 xl:font-b1-semibold rounded-md xl:rounded-lg"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Alert;
