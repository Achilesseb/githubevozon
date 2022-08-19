import React from "react";
import { Tab } from "@headlessui/react";
import UserBasicInfo from "./UserBasicInfo/UserBasicInfo";
import UserRepositories from "./UserRepositories/UserRepositories.jsx";
import { classNames } from "../../utils";
import { useParams } from "react-router-dom";
import { getData } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const UserPage = () => {
  const data = useSelector((data) => data.repositories.user);
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
    <div className="flex flex-col justify-between w-full h-full">
      <Tab.Group>
        <Tab.List className="relative flex order-1 p-1 m-2 space-x-1 rounded-xl bg-tab-fill">
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
        <Tab.Panels className="h-auto mt-4">
          <UserBasicInfo idx="basic-info" key="basic-info" />
          <UserRepositories idx="repositories" key="repositories" />
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default UserPage;
