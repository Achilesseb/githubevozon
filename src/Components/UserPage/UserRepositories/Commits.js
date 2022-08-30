import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import usePaginationHook from "../../../customHooks/customPaginationHook";
import { getDataForCommits, timeSince } from "../../../utils";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";

const Commits = () => {
  const dispatch = useDispatch();
  const { login, repositoryName } = useParams();
  let commits = useSelector((data) => data.repositories.commits);

  const { dataOnPage, changePage, page } = usePaginationHook(commits);

  useEffect(() => {
    getDataForCommits(dispatch, login, repositoryName);
  }, []);

  return (
    <>
      <PaginationComponent
        changePage={changePage}
        page={page}
        modifiers="relative w-[80vw] flex justify-center self-center md:w-[50vw] my-4"
      />
      <div className="flex justify-center w-full h-full mb-4">
        <div className="h-auto h-min-[300px] w-[94vw] bg-gray-200">
          <div className="m-3 border-2 border-gray-300 rounded drop-shadow-xl">
            {dataOnPage?.map((commit, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-start gap-2 p-2 m-4 text-sm bg-gray-300 border-2 border-gray-400 rounded-md hover:scale-105 hover:bg-gray-400"
                >
                  {/* ------COMMIT ------*/}

                  {/* COMMIT MESSAGE */}
                  <div className="font-semibold">
                    {commit.commit.message.split("\n\n")[0]}
                  </div>

                  {/* USER INFO */}
                  <div className="flex items-center gap-2">
                    <Link to={`/${commit.author?.login}/info`}>
                      <img
                        src={commit.author?.avatar_url}
                        className="w-10 rounded-full"
                      />
                    </Link>
                    <div>
                      <Link to={`/${commit.author?.login}/info`}>
                        <span className="mr-2 font-semibold">
                          {commit.author?.login}
                        </span>
                      </Link>
                      commited{" "}
                      {timeSince(new Date(commit.commit.committer.date))} ago
                    </div>
                  </div>
                  {/* -------------- */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Commits;
