import { useState } from "react";
import search from "../../../../public/icons/Search.png";
import closeSearch from "../../../../public/icons/deleteIcon.png";
import down from "../../../../public/icons/ArrowDown.png";
import up from "../../../../public/icons/Arrowup.png";

interface SearchProps {
  message: React.RefObject<HTMLInputElement>;
  onSearch: (searchType: string) => void;
  onClose: () => void;
}

function Search({ message, onSearch, onClose }: SearchProps) {
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
    { value: "titleAndContent", label: "제목내용" },
    { value: "nickname", label: "닉네임" }
  ];

  const handleOptionClick = (optionValue: string) => {
    setSearchType(optionValue);
    setIsDropdownOpen(false);
  };

  return (
    <div className="mx-auto w-full bg-grayoe-950 h-8">
      <div className="relative w-full xl:w-full my-2 z-10">
        <div className="flex gap-1 justify-center">
          <div className="w-full relative">
            <div className="absolute left-0 top-0 bottom-1 w-auto h-8 flex items-center justify-center p-2 rounded-l-md  xl:font-b1-regular text-center  text-white">
              <img
                src={isDropdownOpen ? up : down}
                alt="드롭다운"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-4 h-4 cursor-pointer mr-1 is"
              />
              {options.find((opt) => opt.value === searchType)?.label}
            </div>

            {isDropdownOpen && (
              <div className="absolute left-1 top-9 w-22 bg-white border border-gray-300 rounded-md z-20">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-grayoe-800 text-center"
                    onClick={() => handleOptionClick(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}

            <input
              type="text"
              ref={message}
              placeholder="검색어를 입력해주세요"
              className="w-full h-8 p-2 font-b1-regular  pl-24 pr-14 rounded-md focus:outline-none bg-grayoe-400 placeholder-grayoe-200"
              onKeyDown={handleKeyDown}
            />

            <button
              className="absolute right-0 top-0 bottom-1 w-10 h-8 bg-greenoe-600 text-white rounded-r-md flex items-center justify-center"
              onClick={handleSearch}
            >
              <img src={search} alt="Send" className="w-4 h-4" />
            </button>
          </div>

          <img src={closeSearch} alt="검색창 닫기" className="w-4 h-4 cursor-pointer" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export default Search;
