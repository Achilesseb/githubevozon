import React, { useState } from "react";
import name from "../../../Content/name.png";
import Button from "../../ButtonComponent/ButtonComponent";
import { Link, useParams } from "react-router-dom";
import { DotLoader } from "react-spinners";
import usePaginationHook from "../../../customHooks/customPaginationHook";
import * as bs from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getDataForBranches } from "../../../utils";

const UserRepositories = () => {
  const { reposOnPage, changePage, page } = usePaginationHook();
  const [filter, setFilter] = useState("");
  const [sortByName, setSortByName] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [arrow, setArrow] = useState(false);
  const dispatch = useDispatch();
  const { login, repositoryName } = useParams();

  const handleSort = () => {
    if (sortByName) {
      return (a, b) => (a.name > b.name ? 1 : -1);
    } else {
      return (a, b) => (a.name > b.name ? -1 : 1);
    }
  };

  return (
    <>
      {/* SEARCH BAR INPUT */}
      <div className=" m-4 flex flex-col md:flex-row justify-center md:items-center md:justify-start">
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
        <div className="flex justify-center gap-10 pr-4 pl-8 text mt-4 md:mt-0">
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
              {reposOnPage
                .filter(
                  (repo) =>
                    repo.repoName
                      .toLowerCase()
                      .includes(filter.toLowerCase()) || filter === ""
                )
                .sort(handleSort())
                .map((repo) => (
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
            <div className="absolute bottom-0 flex flex-row text-white align-middle justify-evenly w-sreen md:right-[25px] mb-4">
              <Button
                modifiers="w-[150px]"
                type="primary"
                changePage={changePage}
              >
                Previous
              </Button>
              <span className="h-10 px-2 text-3xl font-bold rounded-full w-30">
                {page + 1}
              </span>
              <Button
                modifiers="w-[150px]"
                type="secondary"
                changePage={changePage}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default UserRepositories;
