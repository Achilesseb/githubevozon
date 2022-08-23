import React from "react";
import { Tab } from "@headlessui/react";
import { useSelector } from "react-redux";

const UserBasicInfo = () => {
  const userData = useSelector((data) => data.repositories.user);
  const {
    name,
    company,
    avatar_url: avatar,
    bio,
    public_repos: repositories,
    followers,
    following,
    location,
  } = userData;
  const userBasicInfo = {
    name,
    company,
    avatar,
    location,
    bio,
    repositories,
    followers,
    following,
  };

  return (
    <Tab.Panel key="basic-info" className="w-auto h-[80vh] align-middle ">
      <ul className="flex flex-col items-center h-full font-normal text-white capitalize justify-evenly text-s">
        {Object.entries(userBasicInfo).map((info) =>
	        {
		        if (!info[1]) return;
						return info[0] === "avatar" ? (
			        <li key={info[0]} className="order-first">
				        <img
					        src={info[1]}
					        style={{ height: "30vh", borderRadius: "100px" }}
				        />
			        </li>
		        ) : (
			        <li key={info[0]}>
				        {`${info[0].replaceAll("_", " ").toLowerCase()} : ${info[1]}`}
			        </li>
		        )
	        }
        )}
      </ul>
    </Tab.Panel>
  );
};
export default UserBasicInfo;
