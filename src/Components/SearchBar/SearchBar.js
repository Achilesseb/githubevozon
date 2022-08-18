import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../utils";
import { Dropdown } from "../Dropdown/Dropdown";
import "./searchBar.css";

export function SearchBar() {
  const dispatch = useDispatch();
  const userData = useSelector((data) => data.user);
  const [username, setUsername] = useState("");
  const [escNotPressed, setescNotPressed] = useState(true);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setescNotPressed(false);
    } else if (event.key === "Enter") {
      setescNotPressed(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRepos();
  };
  const searchRepos = () => {
    getData(dispatch, username);
  };

  const canRenderDropdown = () => {
    if (
      Object.keys(userData).length > 0 &&
      !userData.message &&
      escNotPressed
    ) {
      return <Dropdown />;
    }
  };

  return (
    <>
      <form
        onSubmit={onFormSubmit}
        className="w-80 relative bg-gray-900 p-2 text-gray-300 rounded border-2 border-gray-400"
      >
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
          type="submit"
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded"
          onClick={(e) => {
            handleSubmit(e);
            setescNotPressed(true);
          }}
        >
          Search
        </button>
      </form>
      {canRenderDropdown()}
    </>
  );
}
