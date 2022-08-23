import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDataForCommits } from "../../../utils";

const Commits = () => {
  const dispatch = useDispatch();
  const { login, repositoryName } = useParams();
  const commits = useSelector((data) => data.repositories.commits);
  console.log(commits);

  useEffect(() => {
    getDataForCommits(dispatch, login, repositoryName);
  }, []);

  return (
    <div className="h-full w-full flex justify-center">
      <div className="h-auto h-min-[300px] w-[94vw] bg-white">
        <div>Text</div>
      </div>
    </div>
  );
};

export default Commits;
