import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import * as ai from "react-icons/ai";
import * as bs from "react-icons/bs";
import { options } from "./options";
import { useEffect, useState } from "react";
import {
  getDataForContributors,
  getSpecificRepositoryData,
} from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import Contributors from "./Contributors";

export function RepositoryPage() {
  const { repositoryName, login } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const repository = useSelector((data) => data.repositories.repository);
  if ("message" in repository) navigate("/error");
  const contributors = useSelector((data) => data.repositories.contributors);

  useEffect(() => {
    getSpecificRepositoryData(dispatch, login, repositoryName);
    getDataForContributors(dispatch, login, repositoryName);
  }, []);

  // DETECT WHEN CLICK IS OUTSIDE OF INPUT
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMenu(false);
    };

    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, [showMenu]);

  const handleClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <>
      {/* ROUTE */}
      <div className="w-auto max-w-[100vw] h-auto min-h-[90vh] flex flex-col gap-4 items-start">
        <div className="w-full flex-col justify-start items-center mt-2 ml-[3vw]">
          <div className="py-2 pr-2 text-white flex items-center text-lg mb-2">
            <bs.BsBookmarks />
            <div className="ml-2">
              <Link to={`/${login}/info`}>
                <span className="text-blue-300 hover:underline">{login}</span>
              </Link>{" "}
              /{" "}
              <Link to={`/${login}/repos`}>
                <span className="text-blue-300 hover:underline">repos</span>
              </Link>{" "}
              /{" "}
              <Link to={`/${login}/repos/${repositoryName}`}>
                <span className="font-semibold text-blue-400 hover:underline">
                  {repositoryName}
                </span>
              </Link>
            </div>
          </div>

          {/* COLLAB */}
          <div>
            {!showMenu ? (
              <div
                onClick={(e) => {
                  handleClick(e);
                  setShowMenu(!showMenu);
                }}
                className="cursor-pointer"
              >
                <ai.AiFillCaretRight />
              </div>
            ) : (
              <div
                onClick={(e) => {
                  handleClick(e);
                  setShowMenu(!showMenu);
                }}
                className="cursor-pointer"
              >
                <ai.AiFillCaretDown />
                <div className="border border-black absolute w-auto h-auto bg-gray-300 mt-2 rounded flex flex-col min-w-[35%] z-10">
                  <div className="font-semibold px-2 mt-2">Contributors</div>
                  <div className="bg-white flex flex-col gap-2 p-2">
                    {contributors.map((contributor, index) => {
                      return (
                        <Contributors key={index} contributor={contributor} />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* REPO NAME */}
          <div className="font-serif w-[100%] text-xl text-center text-white ">
            <Link to={`/${login}/repos/${repositoryName}`}>
              <span>{repositoryName}</span>
            </Link>
          </div>
        </div>

        {/* MENU */}
        <nav className="p-0 h-[10vh] w-[100%] flex flex-row justify-center gap-[2%] ">
          {options.map((option, index) => {
            return (
              <Link
                to={`${option.to}`}
                key={index}
                className="w-[30vw] onClick={() => {
              dispatch(setDeleteBranches());
            }} "
              >
                <div className={option.divClassName}>
                  <ai.AiOutlineMenu className={option.iconClassName} />
                  <span className="md:w-[70%] ">{option.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-col w-full ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
