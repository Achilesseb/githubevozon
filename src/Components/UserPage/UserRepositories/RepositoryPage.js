import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { options } from "./options";
import { getSpecificRepositoryData } from "../../../utils";
import { useDispatch } from "react-redux";

export function RepositoryPage() {
  const { repositoryName, login } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getSpecificRepositoryData(dispatch, login, repositoryName);
  }, []);

  return (
    <div className="">
      <div className="my-6 font-serif text-center text-white">
        {repositoryName.toUpperCase()}
      </div>
      <nav className="p-2 h-auto bg-white flex justify-around z-1">
        {options.map((option, index) => {
          return (
            <Link
              to={`${option.to}`}
              key={index}
              className="w-[30%] flex flex-col "
            >
              <div className={option.divClassName}>
                <AiIcons.AiOutlineMenu className={option.iconClassName} />
                <span className="md:w-[70%] ">{option.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      <Outlet />
    </div>
  );
}
