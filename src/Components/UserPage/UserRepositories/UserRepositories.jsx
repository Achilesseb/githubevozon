import React, { useState } from "react";
import name from "../../../Content/name.png";
import date from "../../../Content/date.png";
import { Link } from "react-router-dom";
import { DotLoader } from "react-spinners";
import usePaginationHook from "../../../customHooks/customPaginationHook";
import { useEffect } from "react";
import { getRepositoryData } from "../../../utils";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";
import * as Icons from "react-icons/ai";
import * as BS from "react-icons/bs";
import Button from "../../ButtonComponent/ButtonComponent";
const UserRepositories = () => {
  const [sorter, setSorter] = useState();
  const [direction, setDirection] = useState();
  const [directionStatus, setDirectionStatus] = useState(true);
  const [filterContainerStatus, setFilterContainerStatus] = useState(false);
  const userRepositories = useSelector(
    (data) => data.repositories.repositories
  );
  const { login } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getRepositoryData(dispatch, login);
  }, []);
  useEffect(() => {
    getRepositoryData(dispatch, login, sorter, direction);
  }, [sorter, direction]);
  const { dataOnPage, changePage, page, filter, setFilter } =
    usePaginationHook(userRepositories);

  return (
    <>
      {/* SEARCH BAR INPUT */}
      <div className="flex flex-col justify-center m-2 overflow-hidden md:flex-row md:items-center md:justify-evenly">
        <div className="relative flex justify-center w-full mb-4 md:w-auto ">
          <span className="hidden mr-4 text-white">Search repository:</span>
          <Icons.AiOutlineSearch
            className="absolute z-10 left-2 top-2 "
            color="#e5e7eb"
            size="30px"
          />
          <input
            className="pl-12 w-full h-[6vh] rounded-xl bg-background-fill relative text-white"
            name="filter"
            type="text"
            placeholder="Search repositories"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </div>
        <div className="flex items-center justify-end gap-2 h-[55px] md:mt-0">
          {filterContainerStatus === true ? (
            <div
              className="flex justify-evenly w-[50%]"
              onClick={() => {
                setSorter("created");
                directionStatus === true
                  ? setDirection("asc")
                  : setDirection("desc");
                setDirectionStatus(!directionStatus);
              }}
            >
              <div className="flex flex-col items-center justify-between h-full p-2 align-middle md:h-6">
                <BS.BsFillCalendarDateFill color="#e5e7eb" size="25px" />
                <span className="text-red-400">Created</span>
              </div>
              <div
                className="flex flex-col items-center justify-between h-full p-2 align-middle md:h-6"
                onClick={() => {
                  setSorter("updated");
                  directionStatus === true
                    ? setDirection("asc")
                    : setDirection("desc");
                  setDirectionStatus(!directionStatus);
                }}
              >
                <BS.BsFillFolderSymlinkFill color="#e5e7eb" size="25px" />
                <span className="text-red-400">Updated</span>
              </div>
            </div>
          ) : null}
          <Icons.AiOutlineFilter
            color="rgb(148 163 184)"
            size="50px"
            onClick={() => setFilterContainerStatus(!filterContainerStatus)}
          />
        </div>
        <PaginationComponent
          changePage={changePage}
          page={page}
          modifiers="md:relative absolute self-center hidden bottom-0 md:bottom-0 z-20"
        />
      </div>

      <div className="h-auto my-4 md:mb-0 md:h-[70vh]  w-full overflow-hidden">
        {dataOnPage === null ? (
          <DotLoader />
        ) : (
          <div
            idx="repositories"
            className="relative flex justify-center w-full"
          >
            <ul className="flex flex-col items-center justify-center w-full h-full gap-4 text-white md:flex-row md:flex-wrap ">
              {dataOnPage.map((repo) => (
                <Link
                  to={`${repo.repoName}`}
                  className="grid w-[90%] md:w-full  md:h-[25vh] grid-cols-2 grid-rows-2 p-4 items-center text-center border-b-4 border-l-4 border-slate-400  border-solid rounded-br-none rounded-xl hover:border-slate-50"
                  key={repo.repoName}
                >
                  {Object.values(repo).map((data) => (
                    <div
                      className="first:text-[1.3rem] text-gray-400 last:text-red-400 first:text-blue-400 drop-shadow-lg shadow-white  "
                      key={data}
                    >
                      {data}
                    </div>
                  ))}
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
      <PaginationComponent
        changePage={changePage}
        page={page}
        modifiers="md-hidden relative"
      />
    </>
  );
};
export default UserRepositories;
