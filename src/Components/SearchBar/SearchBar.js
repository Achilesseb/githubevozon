import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../utils";
import { Dropdown } from "../Dropdown/Dropdown";
import debounce from "lodash.debounce";
import { useMemo } from "react";

export function SearchBar() {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();
  const userPrimaryData = useSelector((data) => data.users);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [escNotPressed, setescNotPressed] = useState(true);
  console.log(userPrimaryData);
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
    setUsername(e.target.value);
  };
  const changeDropdownVisibility = (decision) => {
    return setIsVisible(decision);
  };
  useEffect(() => {
    console.log(username);
    searchRepos();
  }, [username]);
  const debouncedResults = useMemo(() => {
    return debounce(handleSubmit, 500);
  }, []);
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  useEffect(() => {
    return () => {
      getUsers(dispatch, {});
    };
  }, []);
  const searchRepos = () => {
    setLoading(true);
    getUsers(dispatch, username);
    setLoading(false);
  };
  const canRenderDropdown = () => {
    if (
      userPrimaryData.items?.length > 0 &&
      !userPrimaryData.message &&
      isVisible &&
      escNotPressed
    ) {
      return <Dropdown />;
    }
  };
  return (
    <>
      <form
        onSubmit={onFormSubmit}
        onMouseOut={() => changeDropdownVisibility(false)}
        onClick={() => changeDropdownVisibility(true)}
        className="relative p-2 text-gray-300 bg-gray-900 border-2 border-gray-400 rounded w-80"
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
          type="search"
          className="ml-6 bg-transparent "
          placeholder="GitHub Username"
          onChange={debouncedResults}
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-gray-600 border border-gray-700 rounded hover:bg-gray-700"
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
