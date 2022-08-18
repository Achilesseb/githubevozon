import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../utils";
import { Dropdown } from "../Dropdown/Dropdown";
import "./searchBar.css";

export function SearchBar() {
  const dispatch = useDispatch();
  const userPrimaryData = useSelector((data) => data.user);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(userPrimaryData);
  const handleSubmit = (e) => {
    e.preventDefault();
    searchRepos();
  };
  const searchRepos = () => {
    setLoading(true);
    getData(dispatch, username);
    setLoading(false);
  };

  return (
    <>
      <div className="relative p-2 text-gray-300 bg-gray-900 border-2 border-gray-400 rounded w-80">
        {/* SEARCH ICON */}
        <svg
          className="absolute left-0 w-5 h-5 ml-1 top-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* INPUT BAR */}
        <input
          className="ml-6 bg-transparent "
          value={username}
          placeholder="GitHub Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* SUBMIT BUTTON */}
        <button
          className="px-4 py-2 font-bold text-white bg-gray-600 border border-gray-700 rounded hover:bg-gray-700"
          onClick={handleSubmit}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {Object.keys(userPrimaryData).length > 0 && !userPrimaryData.message && (
        <Dropdown />
      )}
    </>
  );
}
