import React, { useState } from "react";
import name from "../../../Content/name.png";
import Button from "../../ButtonComponent/ButtonComponent";
import { Link } from "react-router-dom";
import { DotLoader } from "react-spinners";
import usePaginationHook from "../../../customHooks/customPaginationHook";
import * as bs from "react-icons/bs";
import { useEffect } from "react";
import { getRepositoryData } from "../../../utils";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";
const UserRepositories = () => {
  const userRepositories = useSelector(
    (data) => data.repositories.repositories
  );
  const { login } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getRepositoryData(dispatch, login);
  }, []);
  const {
    reposOnPage,
    changePage,
    page,
    filter,
    setFilter,
    handleSort,
    sortByName,
    setSortByName,
  } = usePaginationHook(userRepositories);

  const [showArrow, setShowArrow] = useState(false);
  const [arrow, setArrow] = useState(false);

  return (
    <>
      {/* SEARCH BAR INPUT */}
      <div className="flex flex-col justify-center m-4 md:flex-row md:items-center md:justify-start">
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
        <div className="flex justify-center gap-10 pl-8 pr-4 mt-4 text md:mt-0">
          <div className="flex w-[20%] h-4">
            <img
              src={name}
              alt="sort-image"
              onClick={() => {
                setSortByName(!sortByName);
                setArrow(!arrow);
                setShowArrow(true);
              }}
              className="cursor-pointer"
            />
            {showArrow ? (
              arrow ? (
                <bs.BsArrowDownShort />
              ) : (
                <bs.BsArrowUpShort />
              )
            ) : null}
          </div>
          <div className="flex w-[20%] h-4">
            <img
              src={name}
              alt="sort-image"
              onClick={() => {
                setSortByName(!sortByName);
                setArrow(!arrow);
                setShowArrow(true);
              }}
              className="cursor-pointer"
            />
            {showArrow ? (
              arrow ? (
                <bs.BsArrowDownShort />
              ) : (
                <bs.BsArrowUpShort />
              )
            ) : null}
          </div>
          <div className="flex w-[20%] h-4">
            <img
              src={name}
              alt="sort-image"
              onClick={() => {
                setSortByName(!sortByName);
                setArrow(!arrow);
                setShowArrow(true);
              }}
              className="cursor-pointer"
            />
            {showArrow ? (
              arrow ? (
                <bs.BsArrowDownShort />
              ) : (
                <bs.BsArrowUpShort />
              )
            ) : null}
          </div>
        </div>
      </div>

      <div className="h-full">
        {reposOnPage === null ? (
          <DotLoader />
        ) : (
          <div idx="repositories" className=" flex w-[100vw]  justify-center">
            <ul className="flex flex-col items-center w-full h-full text-white ustify-start w gap-y-2">
              {reposOnPage.sort(handleSort()).map((repo) => (
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
            <PaginationComponent changePage={changePage} page={page} />
          </div>
        )}
      </div>
    </>
  );
};
export default UserRepositories;
