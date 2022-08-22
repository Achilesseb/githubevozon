import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { options } from "./options";
import { getSpecificRepositoryData } from "../../../utils";
import { useDispatch } from "react-redux";

export function RepositoryPage() {
  const { repositoryName, login } = useParams();
  const dispatch = useDispatch();

  const [listBar, setListBar] = useState(options.length + 1);
  useEffect(() => {
    getSpecificRepositoryData(dispatch, login, repositoryName);
  }, []);
  // HANDLE SHOWING LISTBAR MENU
  const handleSidebar = (index) => {
    if (listBar !== index) {
      setListBar(index);
    } else {
      setListBar(options.length + 1);
    }
  };

  return (
    <div className="">
      <div className="my-6 font-serif text-center text-white">
        {repositoryName.toUpperCase()}
      </div>
      <nav className="p-2 h-[10%] bg-white flex justify-around z-1">
        {options.map((option, index) => {
          return (
            <div key={index} className="w-[30%] flex flex-col ">
              <div className={option.divClassName}>
                <AiIcons.AiOutlineMenu
                  onClick={() => {
                    handleSidebar(index);
                  }}
                  className={option.iconClassName}
                />
                <span className="md:w-[70%] ">{option.name}</span>
              </div>

              <ul
                className={
                  listBar !== index
                    ? `${option.ulClassName} opacity-0`
                    : option.ulClassName
                }
              >
                <li>COMING SOON</li>
                <li>COMING SOON</li>
              </ul>
            </div>
          );
        })}
      </nav>
      <Outlet />
    </div>
  );
}
