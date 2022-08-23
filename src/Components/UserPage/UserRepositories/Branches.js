import { useEffect, useState } from "react";
import { getDataForBranches, getProfileBranches } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {} from "../../../redux/Branches/branches-actions";

const Branches = () => {
  const dispatch = useDispatch();
  const { login, repositoryName } = useParams();
  const branches = useSelector((data) => data.repositories.branches);
  const branchesProfile = useSelector((data) => data.branches);
  const [state, setState] = useState();

  // ------ //
  setTimeout(() => {
    setState(1);
  }, 500);

  // ------ //
  useEffect(
    (e) => {
      getDataForBranches(dispatch, login, repositoryName);
      if (branches.length > 0) {
        branches.forEach((branch) => {
          getProfileBranches(dispatch, branch.commit.url, branch.name);
        });
      }
    },
    [state]
  );

  return (
    <>
      <div className="h-full w-full flex justify-center mb-4">
        <div className="min-h-[300px] w-[94vw] md:w-[50vw] bg-white">
          <div className="p-2 font-bold text-xl bg-gray-200">Branches</div>
          <div className="m-2 flex flex-col gap-2 px-2 bg-gray-200 shadow border-2 border-black">
            <div className="flex">
              <div className="w-[40%]  text-xl font-bold">Branch Name</div>
              <div className="w-[40%] text-xl font-bold ml-2 ">Created by</div>
              <div className="w-[20%] text-xl font-bold  ml-2 "></div>
            </div>
            {Object.keys(branchesProfile).length == branches.length
              ? branches.map((branch) => {
                  if (branch.name !== "main") {
                    return (
                      <Link
                        key={branch.name}
                        to={`/${
                          branchesProfile[branch.name].author.login
                        }/info`}
                      >
                        <div className="shadow hover:bg-gray-400 flex gap-4 border-2 border-black">
                          <div className="w-[40%] flex justify-center items-center ">
                            {branch.name}
                          </div>
                          <div className="w-[40%] flex justify-center items-center ml-2 ">
                            {branchesProfile[branch.name].author.login}
                          </div>
                          <img
                            className="w-[19%] ml-2 p-2 rounded-full"
                            src={`${
                              branchesProfile[branch.name].author.avatar_url
                            }`}
                          />
                        </div>
                      </Link>
                    );
                  }
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Branches;
