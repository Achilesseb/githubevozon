import { useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getContentFromRepositoryData } from "../../utils";

export function RepositoryFiles() {
  const { repositoryName, login } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getContentFromRepositoryData(dispatch, login, repositoryName);
  }, []);
  const contents = useSelector((data) => data.content);
  console.log(contents);

  return (
    <>
      <div className="my-20 bg-white flex flex-col p-2 gap-4 ">
        {contents.map((file) => {
          return (
            <div key={file.name} className="flex items-center gap-4">
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
    </>
  );
}
