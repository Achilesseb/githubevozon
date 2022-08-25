import { useEffect, useState } from "react";
import { getDataForBranches } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import usePaginationHook from "../../../customHooks/customPaginationHook";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";
import DotLoader from "react-spinners/DotLoader";

const Branches = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dotLoaderStatus, setDotLoaderStatus] = useState(true);
  const { login, repositoryName } = useParams();
  const branches = useSelector((data) => data.repositories.branches);
  const branchesProfile = useSelector((data) => data.repositories.branchesData);
  if ("message" in branches) navigate("/error");
  const { dataOnPage, changePage, page } = usePaginationHook(branches);
  useEffect(() => {
    getDataForBranches(dispatch, login, repositoryName);
  }, []);
  useEffect(() => {
    setTimeout(() => setDotLoaderStatus(false), 1000);
  }, []);
  return (
    <>
      <PaginationComponent
        changePage={changePage}
        page={page}
        modifiers="relative w-[80vw] flex justify-center self-center md:w-[50vw]"
      />
      <div className="flex justify-center w-full h-full mb-4">
        <div className="min-h-[300px] w-[94vw] md:w-[50vw] bg-gray-200 p-2">
          <div className="p-2 text-xl font-bold text-center bg-gray-200 ">
            Branches
          </div>
          <div className="flex flex-col gap-2 bg-gray-200 border-2 border-black shadow">
            {branchesProfile.length === 0 ? (
              <div className="flex justify-center w-full">
                <DotLoader color="#F9A03C" />
              </div>
            ) : (
              <>
                <div className="flex text-center justify-evenly">
                  <div className="w-[40%]  text-xl font-bold">Branch</div>
                  <div className="w-[60%] text-xl font-bold ml-2 ">Author</div>
                </div>
                {dataOnPage?.map((branch) => {
                  let branchData = branchesProfile?.find(
                    (branchData) => branch.commit.sha === branchData.sha
                  );
                  return (
                    <Link
                      key={branch.name}
                      to={
                        branchData?.author == null
                          ? `/${login}/error`
                          : `/${branchData?.author?.login}/info`
                      }
                    >
                      <div
                        className={`flex gap-2 mb-2 mx-2 border-2 border-black shadow ${
                          branch.name == "main" || branch.name == "master"
                            ? "bg-red-200"
                            : null
                        } h-auto text-[0.7rem] ${
                          branch.name == "main" || branch.name == "master"
                            ? "hover:bg-red-400"
                            : "hover:bg-gray-400"
                        } md:text-[1rem] font-semibold p-0  items-center content-center text-center`}
                      >
                        <div className="w-[38%] h-auto flex justify-center items-center m-2 ">
                          {branch.name}
                        </div>
                        <div className="w-[38%] h-auto flex justify-center items-center   ">
                          {branchData?.author?.login}
                        </div>
                        {dotLoaderStatus === true ? (
                          <DotLoader color="#F9A03C" />
                        ) : (
                          <img
                            className="w-[19%]  p-2 rounded-full "
                            src={`${branchData?.author?.avatar_url}`}
                          />
                        )}
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Branches;
