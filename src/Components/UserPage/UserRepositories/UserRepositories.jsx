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
const UserRepositories = () => {
  const [sorter, setSorter] = useState();
  const [direction, setDirection] = useState();
  const [directionStatus, setDirectionStatus] = useState(true);
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
        <div className="flex justify-center w-full md:w-auto">
          <span className="mr-4 text-white">Search repository:</span>
          <input
            className="rounded"
            name="filter"
            type="text"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </div>
        <div className="flex justify-center gap-5 pl-8 pr-4 mt-4 text md:mt-0">
          <div className="flex flex-col items-center align-middle md:h-6">
            <img
              src={date}
              alt="sort-image"
              onClick={() => {
                setSorter("created");
                directionStatus === true
                  ? setDirection("asc")
                  : setDirection("desc");
                setDirectionStatus(!directionStatus);
              }}
              className="cursor-pointer"
            />
            <span className="text-white">Created</span>
          </div>
          <div className="flex flex-col items-center align-middle md:h-6">
            <img
              src={name}
              alt="sort-image"
              onClick={() => {
                setSorter("updated");
                directionStatus === true
                  ? setDirection("asc")
                  : setDirection("desc");
                setDirectionStatus(!directionStatus);
              }}
              className="cursor-pointer"
            />
            <span className="text-white">Updated</span>
          </div>
        </div>
        <PaginationComponent
          changePage={changePage}
          page={page}
          modifiers="md:relative absolute self-center bottom-[-17vh] md:bottom-0 z-20"
        />
      </div>

      <div className="h-auto mb-[20vh] md:mb-0 md:h-[70vh] mt-2 w-full overflow-hidden">
        {dataOnPage === null ? (
          <DotLoader />
        ) : (
          <div
            idx="repositories"
            className=" flex w-[100vw]  justify-center relative"
          >
            <ul className="flex flex-col items-center w-full h-full text-white ustify-start w gap-y-2">
              {dataOnPage.map((repo) => (
                <Link
                  to={`${repo.repoName}`}
                  className="grid w-[90%] grid-cols-2 grid-rows-2 p-2 text-center border-4 border-orange-500 border-dashed rounded-xl"
                  key={repo.repoName}
                >
                  {Object.values(repo).map((data) => (
                    <div key={data}>{data}</div>
                  ))}
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
export default UserRepositories;
