import sendIcon from "../../../../public/icons/send.png";

function Search() {
  return (
    <div className="mx-auto xl:w-[767px] bg-grayoe-950 h-[calc(100vh-80px)]">
      <div className="relative w-full px-4 xl:w-full my-2">
        <input
          type="text"
          // value={message}
          placeholder="메시지를 입력해주세요"
          className="w-full h-9 p-2 pl-6 pr-14 rounded-full focus:outline-none bg-grayoe-400 placeholder-grayoe-200"
        />
        <button className="absolute right-5 top-1 bottom-1 w-11 h-7 bg-greenoe-600 text-white rounded-full flex items-center justify-center">
          <img src={sendIcon} alt="Send" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Search;
