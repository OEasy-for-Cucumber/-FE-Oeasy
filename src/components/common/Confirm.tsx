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
    <div className="w-full fixed inset-0 flex flex-col items-center justify-center z-50 bg-[#040404] bg-opacity-80 px-[24px]">
      <div className="bg-grayoe-900 text-white rounded-2xl shadow-lg w-full max-w-[336px] xl:w-[336px] p-[24px]">
        <div className="flex flex-col mb-6">
        <p className="font-h6">{message}</p>
        {subMessage && <p className="font-b2-regular text-white text-[14px] mt-2">{subMessage}</p>}
</div>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="font-b2-regular p-2 flex text-center  text-white focus:outline-none">
            취소
          </button>
          <button onClick={onConfirm} className="font-b2-semibold p-2 flex text-center  text-greenoe-600 focus:outline-none">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
