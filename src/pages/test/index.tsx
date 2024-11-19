import { useState } from "react";
import Confirm from "../../components/common/Confirm";

function Test() {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false); // false면 화면에 랜더링 x

  const handleDelete = () => {
    setIsConfirmVisible(true);
  };

  const handleConfirm = () => {
    console.log("삭제 or 탈퇴 로직");
    setIsConfirmVisible(false);
  };

  const handleCancel = () => {
    console.log("삭제 취소");
    setIsConfirmVisible(false);
  };

  return (
    <div>
      <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white">
        삭제하기 {/* 버튼 문구 css는 각자 페이지에 맞게!  */}
      </button>

      <Confirm
        isVisible={isConfirmVisible}
        message="정말 떠나실 건가요?"
        subMessage="탈퇴 시 아래 문구를 똑같이 입력해주세요."
        hasInput={true} // input창이 필요할때만 넣으시면 됩니당
        inputPlaceholder="탈퇴문구 입력" // input창이 필요할때만 넣으시면 됩니당
        validationText="탈퇴문구 어쩌구저쩌구" // input창이 필요할때만 넣으시면 됩니당
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default Test;
