import { useState } from "react";
import sendIcon from "../../../../public/icons/send.png";

interface SearchProps {
  message: React.RefObject<HTMLInputElement>;
  onSearch: (searchType: string) => void;
}

function Search({ message, onSearch }: SearchProps) {
  const [searchType, setSearchType] = useState<string>("title");

  const handleSearch = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    onSearch(searchType);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };
  return (
    <div className="mx-auto xl:w-[767px] bg-grayoe-950 h-[50px]">
      <div className="relative w-full xl:w-full my-2 ">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="absolute left-1 top-1 bottom-1 w-22 h-8 p-2 rounded-l-full font-b2-regular text-center bg-grayoe-100 text-grayoe-800 focus:outline-none"
        >
          <option value="title">제목</option>
          <option value="titleAndContent">제목내용</option>
          <option value="nickname">닉네임</option>
        </select>
        <input
          type="text"
          ref={message}
          placeholder="검색어를 입력해주세요"
          className="w-full h-10 p-2 pl-24 pr-14 rounded-full focus:outline-none bg-grayoe-400 placeholder-grayoe-200"
          onKeyDown={handleKeyDown}
        />
        <button
          className="absolute right-1 top-1 bottom-1 w-11 h-8 bg-greenoe-600 text-white rounded-full flex items-center justify-center"
          onClick={handleSearch}
        >
          <img src={sendIcon} alt="Send" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Search;
