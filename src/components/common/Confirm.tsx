interface ConfirmProps {
  isVisible: boolean;
  message: string;
  subMessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({ isVisible, message, subMessage, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-grayoe-950 bg-opacity-[0.8] z-50">
      <div className="bg-grayoe-900 py-6 px-4 rounded-2xl shadow-lg w-[312px] text-white text-center">
        <p className="font-h5 mb-2">{message}</p>
        {subMessage && <p className="mb-8 font-b2-regular">{subMessage}</p>}

        <div className="flex justify-between gap-2">
          <button onClick={onCancel} className="bg-grayoe-400 w-[136px] h-[56px] font-b1-semibold  rounded-lg">
            취소
          </button>
          <button onClick={onConfirm} className="bg-greenoe-600 w-[136px] h-[56px] font-b1-semibold  rounded-lg">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
