import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSpecificRepositoryData } from "../../utils";
import * as AiIcons from "react-icons/ai";
import { options } from "./options";
import { RepositoryFiles } from "./RepositoryFiles";

export function RepositoryPage() {
  const { repositoryName, login } = useParams();
  const [listBar, setListBar] = useState(options.length + 1);

  const handleSidebar = (index) => {
    if (listBar !== index) {
      setListBar(index);
    } else {
      setListBar(options.length + 1);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getSpecificRepositoryData(dispatch, login, repositoryName);
  }, []);

  return (
    <>
      <div className="text-white my-6 text-center font-serif">
        {repositoryName.toUpperCase()}
      </div>
      <nav className="p-2 h-[7%] bg-white flex justify-around z-1">
        {options.map((option, index) => {
          return (
            <div key={index} className="w-[30%] flex flex-col ">
              <div className={option.divClassName}>
                <AiIcons.AiOutlineMenu
                  onClick={() => {
                    handleSidebar(index);
                    console.log(option.divClassNames);
                  }}
                  className={option.iconClassName}
                />
                <span className="md:w-[70%] text-center">{option.name}</span>
              </div>

              <ul
                className={
                  listBar !== index
                    ? `${option.ulClassName} opacity-0`
                    : option.ulClassName
                }
              >
                <li>CEVA</li>
                <li>CEVA</li>
                <li>CEVA</li>
              </ul>
            </div>
          );
        })}
      </nav>
      <RepositoryFiles />
    </>
  );
}
