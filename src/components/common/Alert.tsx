interface AlertProps {
  isVisible: boolean;
  message: string;
  subMessage?: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ isVisible, message, subMessage, onClose }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-start mt-2 z-50">
      <div className="bg-grayoe-900 text-white rounded-lg shadow-lg w-[280px] h-auto xl:w-[400px] px-4 py-3">
        <div className="flex flex-col mb-2">
        <p className="font-medium text-[14px] xl:text-[16px]">{message}</p>
        {subMessage && <p className="text-[12px] xl:text-[14px] text-gray-400">{subMessage}</p>}</div>
        <button
          onClick={onClose}
          className="flex text-center ml-auto px-4 py-1 mt-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none text-sm"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Alert;
