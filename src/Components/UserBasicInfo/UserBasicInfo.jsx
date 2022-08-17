import React from "react";
import { Tab } from "@headlessui/react";
import { useSelector } from "react-redux";

const UserBasicInfo = () => {
  const userData = useSelector((data) => data.user);
  let userBasicInfo = [];
  const {
    name,
    company,
    avatar_url: avatar,
    bio,
    public_repos: repositories,
    followers,
    following,
  } = userData;
  userBasicInfo.push({
    name,
    company,
    avatar,
    bio,
    repositories,
    followers,
    following,
  });

  return (
    <Tab.Panel key="basic-info" className="h-full align-middle w-100">
      <ul className="flex flex-col h-full font-normal text-white capitalize justify-evenly text-s text-start">
        {Object.entries(userBasicInfo[0]).map((info) =>
          info[0] === "avatar" ? (
            <li key={info[0]} className="order-first">
              <img
                src={info[1]}
                style={{ height: "180px", borderRadius: "100px" }}
              />
            </li>
          ) : (
            <li key={info[0]}>
              {`${info[0].replaceAll("_", " ").toLowerCase()} : ${info[1]}`}
            </li>
          )
        )}
      </ul>
    </Tab.Panel>
  );
};
export default UserBasicInfo;
