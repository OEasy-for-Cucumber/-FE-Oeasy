
function ConfirmPasswordModal() {
  return (
    <div className="w-full h-screen">
        <div className="w-full h-[100px] border mx-auto">
            <p>비밀번호를 입력해주세요.</p>
            <input type="password" name="password" id="password" />
        </div>
    </div>
  )
}

export default ConfirmPasswordModal