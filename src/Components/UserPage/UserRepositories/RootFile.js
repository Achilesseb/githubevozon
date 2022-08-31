import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getContentFromRepositoryData } from "../../../utils";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setDataForNesting } from "../../../redux/RepositoriesSlice/repositories-actions";
import CodeViewer from "../../CodeViewer/CodeViewer";
export function RootFile() {
  const params = useParams();
  const navigate = useNavigate();
  const handleOpenViewer = (e, file) => {
    dispatch(setDataForNesting(file));
  };
  const location = useLocation();
  let contents = useSelector((data) => data.repositories.content);
  const dispatch = useDispatch();
  const path = useMatch("/*");
  const ad = path.pathname.split("/").filter((params, index) => index > 4);

  if (contents.message == "Not Found") {
    navigate("/error");
  }
  useEffect(() => {
    getContentFromRepositoryData(
      dispatch,
      params.login,
      params.repositoryName,
      ad
    );
  }, [path]);
  return (
    <div className="z-0 flex flex-col self-center w-full h-auto gap-4 px-4 pb-4 mb-4 overflow-hidden bg-inherit">
      <div className="flex items-center p-2 text-2xl text-blue-400">
        <AiIcons.AiOutlineFile className="h-full" />
        <span>
          {location.pathname
            .slice(location.pathname.lastIndexOf("/"))
            .replace("/", "")}
        </span>
      </div>
      {contents.message !== "This repository is empty" && !contents?.message ? (
        contents.type === "file" ? (
          <CodeViewer />
        ) : (
          contents.map((file, index) => {
            return file.type !== "file" ? (
              <Link
                to={`${path.pathname}/${file.name}`}
                key={index}
                className="flex items-center gap-4 p-4 text-white border-b-4 border-l-4 border-solid rounded-br-none bg-slate-800 hover:shadow-3xl border-slate-400 md:rounded-br-xl rounded-xl hover:border-slate-50"
              >
                <AiIcons.AiFillFolderOpen />
                {file.name}
              </Link>
            ) : (
              <Link
                to={`${[path.pathname, file.name].join("/").replaceAll(",")}`}
                onClick={(e) => {
                  handleOpenViewer(e, file);
                }}
                key={index}
                className="flex items-center gap-4 p-4 text-white border-b-4 border-l-4 border-solid bg-slate-800 border-slate-400 hover:shadow-3xl md:rounded-br-xl rounded-xl hover:border-slate-50"
              >
                <AiIcons.AiOutlineFile />
                {file.name}
              </Link>
            );
          })
        )
      ) : null}
    </div>
  );
}
