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
            onClick={() => setIsSearchVisible(true)}
            className="border-solid border-2 border-white font-bold text-white text-xl font-sans durations-500 px-10 py-4 hover:bg-white hover:text-black "
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
}
