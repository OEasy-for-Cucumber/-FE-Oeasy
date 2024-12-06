interface AlertProps {
  isVisible: boolean;
  message: string;
  subMessage?: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ isVisible, message, subMessage, onClose }) => {
  if (!isVisible) return null;
  return (
    <div className="w-full fixed inset-0 flex flex-col items-center justify-center z-50 bg-[#040404] bg-opacity-80 px-[24px]">
      <div className="bg-grayoe-900 text-white rounded-2xl shadow-lg w-full max-w-[336px] xl:w-[336px] p-[24px]">
        <div className="flex flex-col mb-6">
        <p className="font-h6">{message}</p>
        {subMessage && <p className="font-b2-regular text-white text-[14px] mt-2">{subMessage}</p>}</div>
        <button
          onClick={onClose}
          className="p-2 flex text-center ml-auto text-greenoe-600 font-b2-semibold focus:outline-none"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Alert;
