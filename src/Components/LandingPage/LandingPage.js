import { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import "./landingPage.css";

export function LandingPage() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (value) => {
    setIsClicked(value);
  };

  return (
    <div className=" full-page min-h-[90vh]">
      <div className="mt-6 search-container">
        {isSearchVisible ? (
          <SearchBar isClicked={isClicked} onClick={handleClick} />
        ) : (
          <button
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="px-10 py-4 font-sans text-xl font-bold text-white border-2 border-white border-solid durations-500 hover:bg-white hover:text-black "
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
}
