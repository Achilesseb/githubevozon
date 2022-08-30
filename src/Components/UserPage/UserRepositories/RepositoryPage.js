import {
  Link,
  Navigate,
  Outlet,
  useLocation,
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
import Button from "../../ButtonComponent/ButtonComponent";

export function RepositoryPage() {
  const { repositoryName, login } = useParams();
  const params = useParams();
  const location = useLocation();
  console.log(location);
  console.log(params);
  console.log(
    location.pathname.slice(location.pathname.lastIndexOf("/")).replace("/", "")
  );
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
      <div className="flex flex-col items-start w-full h-auto">
        <div className="flex-col items-center justify-start w-full pl-4 mt-2">
          <div className="flex items-center py-2 pr-2 mb-2 text-lg text-white">
            <bs.BsBookmarks />
            <div className="">
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
                  <div className="px-2 mt-2 font-semibold">Contributors</div>
                  <div className="flex flex-col gap-2 p-2 bg-white">
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
          {/* <div className="font-serif w-[100%] text-xl text-center text-white ">
            <Link to={`/${login}/repos/${repositoryName}`}>
              <span>{repositoryName}</span>
            </Link>
          </div> */}
        </div>

        {/* MENU */}
        <nav className="p-0 h-[12vh] w-[100%] flex flex-row justify-around gap-[2%] bg-slate-800 items-center  ">
          {options.map((option, index) => {
            return (
              <Link
                to={`${option.to}`}
                key={index}
                className="w-[30vw] md:w-[15vw] md:grid grid-cols-2[50%_50%] hover:border-2 border-white rounded-full transition ease-linear duration-700"
              >
                <Button
                  className={option.divClassName}
                  type="primary"
                  modifiers="w-full flex justify-evenly text-slate-200 first:justify-start grid grid-cols-[30%_70%] md:px-8 transition ease-in-out duration-300"
                >
                  <bs.BsFileEarmarkCode
                    className={`${option.iconClassName} justify-self-start w-full h-full `}
                  />
                  <span className="flex justify-center capitalize ">
                    {option.name}
                  </span>
                </Button>
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
