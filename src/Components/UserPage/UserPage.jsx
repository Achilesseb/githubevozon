import React from "react";
import { Tab } from "@headlessui/react";
import UserBasicInfo from "../UserBasicInfo/UserBasicInfo";
import UserRepositories from "../UserRepositories/UserRepositories";
import { classNames } from "../../utils";
import { useParams } from "react-router-dom";
import { getData } from "../../utils";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const UserPage = () => {
  const dispatch = useDispatch();
  const { login } = useParams();
  useEffect(() => {
    getData(dispatch, login);
  }, []);

  const categories = {
    Basic_Info: [],
    Repositories: [],
    Recent_Activity: [],
  };

  return (
    <div className="flex flex-col w-full h-[100vh] justify-start">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 rounded-xl bg-tab-fill ">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 transition ease-in-out duration-300",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.02] hover:text-white"
                )
              }
            >
              {category.replace("_", " ")}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-5 h-[85vh]">
          <UserBasicInfo idx="basic-info" key="basic-info" />
          <UserRepositories idx="repositories" id="repositories" />
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default UserPage;
