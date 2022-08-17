import React from "react";
import { useSelector } from "react-redux";
import { Tab } from "@headlessui/react";

const UserRepositories = () => {
  const userData = useSelector((data) => data.user);
  console.log(userData);
  const categories = {
    Basic_Info: [
      {
        name: "Prisacariu-Victor_Sebastian",
        repositories: 16,
        company: "Evozon",
        avatar: "https://avatars.githubusercontent.com/u/95617979?v=4",
        created: "2021-12-06T09:56:38Z",
        location: "Cluj-Napoca",
        bio: "Borring bio to read!",
        followers: 5,
        following: 10,
        updated_at: "2022-08-16T09:34:27Z",
      },
    ],
    Repositories: [],
    Recent_Activity: [],
  };
  console.log(userData);
  console.log(categories.Basic_Info);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="w-full h-screen ">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 rounded-xl bg-tab-fill ">
          {Object.keys(categories).map((category) => (
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
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
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={idx} className="flex-col h-auto ">
              {posts.map((post) => (
                <ul className="flex-col mt-1 space-x-1 text-xs font-normal leading-4 text-white">
                  {Object.entries(posts[0]).map((post) => (
                    <li className="text-xs ">
                      {post[0] === "avatar" ? (
                        <img
                          src={post[1]}
                          style={{ height: "200px", borderRadius: "100px" }}
                        />
                      ) : (
                        post[0].replace("_", " ").toLowerCase()
                      )}{" "}
                      : {post[1]}
                    </li>
                  ))}
                </ul>
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default UserRepositories;
