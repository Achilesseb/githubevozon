import React from "react";
import { useSelector } from "react-redux";
import { Tab } from "@headlessui/react";
import Button from "../ButtonComponent/ButtonComponent";
import { Link } from "react-router-dom";
import { DotLoader } from "react-spinners";
import usePaginationHook from "./customPaginationHook";
import { useParams } from "react-router-dom";
const UserRepositories = () => {
  const { reposOnPage, handleClick, page } = usePaginationHook();
  console.log(reposOnPage, reposOnPage);
  return (
    <div className="h-full">
      {reposOnPage === null ? (
        <DotLoader />
      ) : (
        <Tab.Panel
          idx="repositories"
          key="repositories"
          className="relative h-full w-100"
        >
          <ul className="flex flex-col justify-start h-full text-white align-top gap-y-2">
            {reposOnPage.map((repo) => (
              <Link
                to={`${repo.repoName}`}
                className="grid grid-cols-2 grid-rows-2 p-2 text-center border-4 border-orange-500 border-dashed rounded-xl"
                key={repo.repoName}
              >
                {Object.values(repo).map((data) => (
                  <div key={data}>{data}</div>
                ))}
              </Link>
            ))}
          </ul>
          <div className="absolute bottom-0 flex flex-row text-white align-middle justify-evenly w-sreen right-[30px]">
            <Button
              modifiers="w-[150px]"
              type="primary"
              handleClick={handleClick}
            >
              Next
            </Button>
            <span className="h-10 px-2 text-3xl font-bold rounded-full w-30">
              {page + 1}
            </span>
            <Button
              modifiers="w-[150px]"
              type="secondary"
              handleClick={handleClick}
            >
              Previous
            </Button>
          </div>
        </Tab.Panel>
      )}
    </div>
  );
};
export default UserRepositories;
