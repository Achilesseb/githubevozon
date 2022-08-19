import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDataForNesting, saveURLNames, URLNames } from "../../../utils";

export function RootFile({ setIsRootFilesVisible }) {
  const { repositoryName } = useParams();
  const contents = useSelector((data) => data.repositories.content);
  const dispatch = useDispatch();

  return (
    <div className="my-20 bg-white flex flex-col p-2 gap-1 z-0 h-auto">
      <div className="">{repositoryName}</div>
      {contents.map((file, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              if (file.type == "dir" || file.type == "tree") {
                getDataForNesting(dispatch, file.url);
                saveURLNames(repositoryName, "Nothing to Show");
                saveURLNames(file.name, file.url);
                setTimeout(() => {
                  setIsRootFilesVisible(false);
                }, 300);
              }
            }}
            className="flex items-center gap-4 border-2 border-gray-300 p-4 hover:bg-gray-200 hover:cursor-pointer shadow"
          >
            {file.type == "file" ? (
              <AiIcons.AiOutlineFile />
            ) : (
              <AiIcons.AiFillFolderOpen />
            )}
            <div>{file.name}</div>
          </div>
        );
      })}
    </div>
  );
}
