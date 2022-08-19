import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDataForNesting, saveURLNames, URLNames } from "../../../utils";

export function NestingFiles({ setIsRootFilesVisible }) {
  const { repositoryName } = useParams();
  const contents = useSelector((data) => data.repositories.nesting);
  const dispatch = useDispatch();

  return (
    <div className="my-20 bg-white flex flex-col p-2 gap-1 z-0">
      <div className="flex gap-2 flex-wrap">
        {URLNames.map((array, index) => (
          <div
            key={Object.keys(array)}
            onClick={() => {
              if (Object.keys(array) == repositoryName) {
                URLNames.splice(0);
                setIsRootFilesVisible(true);
              } else {
                URLNames.splice(index + 1);
                getDataForNesting(dispatch, Object.values(array));
              }
            }}
            className="cursor-pointer hover:text-blue-400"
          >
            {Object.keys(array)} /
          </div>
        ))}
      </div>
      {contents[0].map((file, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              if (file.type == "dir" || file.type == "tree") {
                saveURLNames(file.name, file.url);
                console.log(URLNames);
                getDataForNesting(dispatch, file.url);
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
