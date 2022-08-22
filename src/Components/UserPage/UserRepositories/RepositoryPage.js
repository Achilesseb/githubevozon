import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { options } from "./options";
import { getSpecificRepositoryData } from "../../../utils";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
    <div className="w-auto max-w-[100vw] h-auto min-h-[90vh] flex flex-col gap-4 mb-8">
      <div className="mt-2 font-serif text-xl text-center text-white ">
        {repositoryName.toUpperCase()}
      </div>
      <nav className="p-0 h-[10vh] flex flex-row justify-evenly z-1 ">
        {options.map((option, index) => {
          return (
            <Link to="files" key={index} className="w-[30vw]  ">
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
            </Link>
          );
        })}
      </nav>
      <div className="flex self-center w-[90%] ">
        <Outlet />
      </div>
    </div>
  );
}
