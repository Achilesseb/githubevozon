import { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import IntroMessage from "./IntroMessage";
import "./landingPage.css";

export function LandingPage() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (value) => {
    setIsClicked(value);
  };

  return (
    <div className=" full-page min-h-[90vh]">
      <div className="mt-10 search-container">
        {/* {isSearchVisible ? (
          <SearchBar isClicked={isClicked} onClick={handleClick} />
        ) : (
          <button
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="px-10 py-4 font-sans text-xl font-bold text-white border-2 border-white border-solid durations-500 hover:bg-white hover:text-black "
          >
            Get Started
          </button>
        )} */}
        <div className="relative w-auto h-auto min-w-[90vw] min-h-[100px] md:min-w-[600px] md:h-[350px] rounded-[20px] flex items-center ">
          <div
            onMouseEnter={() => setIsSearchVisible(true)}
            onMouseLeave={() => setIsSearchVisible(false)}
            className="flex justify-center items-center hover:before:duration-500 w-full h-full top-0 left-0 before:absolute before:top-0 before:left-0  before:bg-gray-200/30 before:rounded-full before:w-[120px] before:h-[120px] before:left-[120px] before:top-[-10px] md:before:top-[115px] md:before:left-[240px] hover:before:bg-gray-300/50  hover:before:top-0 hover:before:left-0 hover:before:w-full hover:before:h-full hover:before:rounded-[20px]"
          >
            {isSearchVisible ? (
              <div className="absolute h-full w-full flex flex-col justify-center items-center">
                <IntroMessage />
                <div className="h-full flex justify-center w-full mb-2">
                  <div className="absolute">
                    <SearchBar isClicked={isClicked} onClick={handleClick} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[80px] w-[80px] z-10">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  version="1.1"
                  data-view-component="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
