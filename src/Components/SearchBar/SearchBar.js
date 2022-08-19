import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../utils";
import { Dropdown } from "../Dropdown/Dropdown";
import debounce from "lodash.debounce";
import { useMemo } from "react";

export function SearchBar({ isClicked, onClick }) {
  const dispatch = useDispatch();
  const userPrimaryData = useSelector((data) => data.repositories.users);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [escNotPressed, setescNotPressed] = useState(true);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setescNotPressed(false);
      console.log(escNotPressed);
    }
  }, []);

  // CHECK IF USERNAME LENGTH HAS BEEN CHANGED
  useEffect(() => {
    setescNotPressed(true);
    onClick(true);
  }, [username]);

  // DETECT WHEN CLICK IS OUTSIDE OF INPUT
  useEffect(() => {
    const handleClickOutside = () => {
      onClick(false);
    };

    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, [onClick]);

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(true);
  };

  // DETECT WHEN ESC KEY IS PRESSED
  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);

  // SUBMIT INPUT FOR FETCHING DATA
  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  // HANDLE SUBMIT OVER 0.5 SEC
  useEffect(() => {
    searchRepos();
  }, [username]);
  const debouncedResults = useMemo(() => {
    return debounce(handleSubmit, 500);
  }, []);

  // RESET HANDLE SUBMIT
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  // RESET USERDATA
  useEffect(() => {
    return () => {
      getUsers(dispatch, {});
    };
  }, []);

  // FETCHING DATA
  const searchRepos = () => {
    setLoading(true);
    getUsers(dispatch, username);
    setLoading(false);
  };
  const canRenderDropdown = () => {
    if (
      userPrimaryData.items?.length > 0 &&
      !userPrimaryData.message &&
      isClicked &&
      escNotPressed
    ) {
      return <Dropdown />;
    }
  };

  return (
    <>
      <div
        onClick={(e) => {
          handleClick(e);
          setescNotPressed(true);
        }}
        className="relative p-2 text-gray-300 bg-gray-900 border-2 border-gray-400 rounded w-80"
      />
      {/* SEARCH ICON */}
      <div className="flex flex-row items-center align-middle justify-evenly">
        <svg
          className="w-5 ml-1 "
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
          // type="text"
          className="ml-6 bg-transparent "
          placeholder="GitHub Username"
          onChange={debouncedResults}
        />
      </div>
      {canRenderDropdown()}
    </>
  );
}
