import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getContentFromRepositoryData } from "../../../utils";
import * as AiIcons from "react-icons/ai";
import { options } from "./options";
import { RepositoryFiles } from "./RepositoryFiles";
import { RootFile } from "./RootFile";
import { NestingFiles } from "./NestingFiles";

export function RepositoryPage() {
  const { repositoryName, login } = useParams();
  const [listBar, setListBar] = useState(options.length + 1);
  const [isRootFilesVisible, setIsRootFilesVisible] = useState(true);

  // HANDLE SHOWING LISTBAR MENU
  const handleSidebar = (index) => {
    if (listBar !== index) {
      setListBar(index);
    } else {
      setListBar(options.length + 1);
    }
  };

  // GET CONTENTS FROM REPOSITORY
  const dispatch = useDispatch();
  useEffect(() => {
    getContentFromRepositoryData(dispatch, login, repositoryName);
  }, []);

  // RENDER ROOTFILES COMPONENT
  const canRenderRootFiles = () => {
    if (isRootFilesVisible) {
      return <RootFile setIsRootFilesVisible={setIsRootFilesVisible} />;
    }
  };
  // RENDER NESTINGFILES COMPONENT
  const nestingFiles = () => {
    if (!isRootFilesVisible) {
      return <NestingFiles setIsRootFilesVisible={setIsRootFilesVisible} />;
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

      {canRenderRootFiles()}
      {nestingFiles()}
    </div>
  );
}
