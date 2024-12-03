interface AlertProps {
  isVisible: boolean;
  message: string;
  subMessage?: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ isVisible, message, subMessage, onClose }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-start z-50">
      <div className="bg-grayoe-900 py-4 px-2 xl:py-6 xl:px-4 rounded-lg xl:rounded-2xl shadow-lg w-[200px] h-auto xl:w-[280px]  text-white text-center mt-16 xl:mt-20">
        <p className="font-b2-regular xl:font-b1-regular  mb-2">{message}</p>
        {subMessage && <p className="mb-8 font-c2 xl:font-b2-regular">{subMessage}</p>}
        <button
          onClick={onClose}
          className="bg-greenoe-600 my-1 xl:my-2 w-[60px] h-[30px] xl:w-[80px] xl:h-[30px] font-c2 xl:font-b2-semibold rounded-md xl:rounded-lg"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Alert;
