import { useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import { SearchBar } from "../SearchBar/SearchBar";
import "./landingPage.css";

export function LandingPage() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  return (
    <div className="full-page">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="search-container">
        {isSearchVisible ? (
          <SearchBar />
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
