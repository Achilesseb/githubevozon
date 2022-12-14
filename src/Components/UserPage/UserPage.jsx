import React from "react";
import { Tab } from "@headlessui/react";
import { classNames } from "../../utils";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { getData } from "../../utils";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const UserPage = () => {
  const dispatch = useDispatch();
  const { login } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getData(dispatch, login);
  }, []);

  const categories = {
    Basic_Info: "info",
    Repositories: "repos",
    Recent_Activity: "activity",
  };

  const checkRoute = (category) => {
    if (
      location.pathname === `/${login}/${category[1]}` ||
      location.pathname === `/${login}/${category[1]}/`
    ) {
      return true;
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Tab.Group>
        <Tab.List className="flex order-first p-2 mx-2 my-2 mb-4 space-x-1 rounded-xl bg-background-fill">
          {Object.entries(categories).map((category) => (
            <Tab
              onClick={() => navigate(category[1])}
              key={category[0]}
              className={() =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 transition ease-in-out duration-300",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  checkRoute(category)
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.02] hover:text-white"
                )
              }
            >
              {category[0].replace("_", " ")}
            </Tab>
          ))}
        </Tab.List>
        <Outlet />
      </Tab.Group>
    </div>
  );
};
export default UserPage;
