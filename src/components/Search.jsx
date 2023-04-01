import { useState } from "react";
import searchIcon from "../assets/icons/search-normal.svg";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(searchQuery);
  };

  return (
    <div className="flex justify-center rounded-[26px] sm:rounded-[36px] items-center bg-[#F6F6F6] max-w-full sm:max-w-[85%] sm:max-w-sm mt-20 sm:mt-4 md:mt-0 shadow-[4px__4px_12px_1px_rgba(0,0,0,0.25)] sm:py-20]">
      <img
        src={searchIcon}
        alt="search-icon"
        className="h-8 ml-3 sm:h-10 sm:ml-3"
      />
      <input
        type="text"
        placeholder="Cari wisata..."
        className="border-none bg-[#F6F6F6] w-full placeholder:text-[#515151] text-sm sm:text-lg focus:divide-y divide-blue-200 focus:ring-0"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        onInput={(e) => handleSearch(e)}
      />
      <button
        className="bg-[#6889FF] rounded-[26px] sm:rounded-[36px] font-bold text-sm sm:text-xl text-white py-3 sm:py-3 px-8 sm:px-10 shadow-[-4px__4px_12px_1px_rgba(0,0,0,0.25)]"
        onClick={handleSearch}
      >
        Cari
      </button>
    </div>
  );
};

export default Search;
