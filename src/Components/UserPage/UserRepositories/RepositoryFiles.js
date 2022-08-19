// import { useEffect, useState } from "react";
// import * as AiIcons from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { getContentFromRepositoryData } from "../../../utils";
// import { NestingFiles } from "./NestingFiles";
// import { RootFile } from "./RootFile";

// export function RepositoryFiles({ selectedFile }) {
//   const { repositoryName, login } = useParams();
//   const [isRootFilesVisible, setIsRootFilesVisible] = useState(true);
//   selectedFile = "text";

//   const dispatch = useDispatch();
//   useEffect(() => {
//     getContentFromRepositoryData(dispatch, login, repositoryName);
//   }, []);
//   const contents = useSelector((data) => data.repositories.content);
//   console.log(contents);

//   return (
//     <>
//       {canRenderRootFiles()}
//       {nestingFiles()}
//     </>
//   );
// }
