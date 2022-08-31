import {
  Link,
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
  classNames,
  getDataForContributors,
  getSpecificRepositoryData,
} from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import Contributors from "./Contributors";
import { Tab } from "@headlessui/react";

export function RepositoryPage() {
  const { repositoryName, login } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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

  const checkRoute = (option) => {
    if (
      location.pathname === `/${login}/repos/${repositoryName}/${option.to}` ||
      location.pathname === `/${login}/repos/${repositoryName}/${option.to}/`
    ) {
      return true;
    }
  };

  return (
    <>
      {/* ROUTE */}
      <div className="w-full h-auto min-h-[85vh] flex flex-col gap-4 items-start">
        <div className="w-full flex-col justify-start items-center mt-2 pl-[3vw] ">
          <div className="flex items-center py-2 pr-2 mb-2 text-lg text-white">
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
                <ai.AiFillCaretRight className="text-white" />
              </div>
            ) : (
              <div
                onClick={(e) => {
                  handleClick(e);
                  setShowMenu(!showMenu);
                }}
                className="cursor-pointer"
              >
                <ai.AiFillCaretDown className="text-white" />
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
          <div className="font-serif w-[100%] text-xl text-center text-white ">
            <Link to={`/${login}/repos/${repositoryName}`}>
              <span>{repositoryName}</span>
            </Link>
          </div>
        </div>

        {/* MENU */}
        <div className="h-[5vh] w-full px-2">
          <Tab.Group>
            <Tab.List className="flex justify-center order-first w-full h-full mb-4 rounded-xl bg-background-fill">
              {options.map((option, index) => {
                return (
                  <Tab
                    onClick={() => {
                      navigate(option.to);
                    }}
                    key={index}
                    className={() =>
                      classNames(
                        option.divClassName,
                        checkRoute(option)
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.02] hover:text-white"
                      )
                    }
                  >
                    <bs.BsFileEarmarkCode className={option.iconClassName} />
                    <span className={option.ulClassName}>{option.name}</span>
                  </Tab>
                );
              })}
            </Tab.List>
          </Tab.Group>
        </div>
        <div className="mt-2 flex flex-col w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
