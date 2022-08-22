import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useParams } from "react-router-dom";
import { getContentFromRepositoryData } from "../../../utils";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setDataForNesting } from "../../../redux/RepositoriesSlice/repositories-actions";
export function RootFile() {
  const params = useParams();
  const handleOpenViewer = (e, file) => {
    dispatch(setDataForNesting(file));
  };
  const contents = useSelector((data) => data.repositories.content);
  const dispatch = useDispatch();
  const path = useMatch("/*");
  const ad = path.pathname.split("/").filter((params, index) => index > 3);
  useEffect(() => {
    getContentFromRepositoryData(
      dispatch,
      params.login,
      params.repositoryName,
      ad
    );
  }, [path]);
  return (
    <div className="z-0 flex flex-col h-auto gap-1 p-2 my-20 bg-white">
      <div className="">{params.repositoryName}</div>
      {}
      {contents.map((file, index) => {
        return file.type !== "file" ? (
          <Link
            to={`${path.pathname}/${file.name}`}
            key={index}
            className="flex items-center gap-4 p-4 border-2 border-gray-300 shadow hover:bg-gray-200 hover:cursor-pointer"
          >
            <AiIcons.AiFillFolderOpen />
            {file.name}
          </Link>
        ) : (
          <Link
            to={`/${params.login}/${params.repositoryName}/${file.name}/viewer`}
            onClick={(e) => {
              handleOpenViewer(e, file);
            }}
            className="flex items-center gap-4 p-4 border-2 border-gray-300 shadow hover:bg-gray-200 hover:cursor-pointer"
          >
            <AiIcons.AiOutlineFile />
            {file.name}
          </Link>
        );
      })}
    </div>
  );
}
