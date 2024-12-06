import { useState } from "react";
import search from "../../../../public/icons/searchG.png";
import down from "../../../../public/icons/dropDown.png";
import up from "../../../../public/icons/dropUp.png";

interface SearchProps {
  message: React.RefObject<HTMLInputElement>;
  onSearch: (searchType: string) => void;
}

function WebSearch({ message, onSearch }: SearchProps) {
  const [searchType, setSearchType] = useState<string>("title");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    onSearch(searchType);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const options = [
    { value: "title", label: "제목" },
    { value: "titleAndContent", label: "제목+내용" },
    { value: "nickname", label: "닉네임" }
  ];

  const handleOptionClick = (optionValue: string) => {
    setSearchType(optionValue);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full bg-grayoe-950 ">
      <div className="w-full flex gap-1 justify-between items-center border border-solid border-grayoe-600 ">
        <div className="flex justify-center items-center gap-2 ">
          <div className=" w-auto px-1 h-8 flex items-center justify-center  font-b2-regular text-center ">
            <img
              src={isDropdownOpen ? up : down}
              alt="드롭다운"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-4 h-4 cursor-pointer mr-1 "
            />
            {options.find((opt) => opt.value === searchType)?.label}
          </div>

          <p className="font-b2-regular text-grayoe-600">|</p>

          <input
            type="text"
            ref={message}
            placeholder="검색어를 입력해주세요"
            className="w-auto h-auto font-b2-regular focus:outline-none bg-grayoe-950 placeholder-grayoe-300"
            onKeyDown={handleKeyDown}
          />
        </div>

        <button className=" w-10 h-8 flex items-center justify-center" onClick={handleSearch}>
          <img src={search} alt="Send" className="w-4 h-4" />
        </button>
      </div>
      <div className="relative">
        {isDropdownOpen && (
          <div className="absolute left-0 top-1 w-22 border border-grayoe-600 rounded-md">
            {options.map((option) => (
              <div
                key={option.value}
                className="px-3 py-1 w-22 cursor-pointer text-white font-c2 text-start"
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WebSearch;
