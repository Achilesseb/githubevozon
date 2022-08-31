import React from "react";
import { Tab } from "@headlessui/react";
import { useSelector } from "react-redux";
import { DotLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Md from "react-icons/md";
import Button from "../../ButtonComponent/ButtonComponent";

const UserBasicInfo = () => {
  const navigate = useNavigate();
  const userData = useSelector((data) => data.repositories.user);
  const [dotLoaderStatus, setDotLoaderStatus] = useState(true);
  useEffect(() => {
    setTimeout(() => setDotLoaderStatus(false), 1500);
  }, []);
  const {
    name,
    company,
    avatar_url: avatar,
    bio,
    public_repos: repositories,
    location,
    blog,
  } = userData;
  const userBasicInfo = {
    person: name,
    blog,
    work: company,
    avatar,
    home: location,
    description: bio,
    inventory: `${repositories} repositories`,
  };

  return (
    <Tab.Panel
      key="basic-info"
      className="relative flex justify-center w-full h-full p-8 align-middle"
    >
      <ul className="flex flex-col w-full  items-center h-full md:w-[50vw] gap-4 md:gap-8 font-serif text-white justify-evenly text-s md:text-xl">
        {Object.entries(userBasicInfo).map((info) => {
          if (!info[1]) return;
          return info[0] === "avatar" ? (
            dotLoaderStatus === true ? (
              <div
                className="left-20 order-first h-[30vh] mb-2 md:absolute md:h-[50vh] items-center content-center"
                key="dotLoader"
              >
                <DotLoader size="20vh" key="dotLoader" color="#374151" />
              </div>
            ) : (
              <li
                key={info[0]}
                className="left-20 order-first h-[30vh] mb-2 bottom-10 md:absolute md:h-[50vh]"
              >
                <img
                  src={info[1]}
                  key={`${info[1]}_avatar`}
                  className="h-full shadow-lg shadow-white"
                  style={{ borderRadius: "50%" }}
                />
              </li>
            )
          ) : info[0] === "blog" ? (
            <div className="order-last" key="blog">
              <Button
                type="primary"
                modifiers="rounded-s w-[150px] h-[50px] md:absolute left-[10vw] top-[5vh] md:w-[15vw]"
              >
                <a href={info[1]}>Blog</a>
              </Button>
            </div>
          ) : (
            <div
              className="w-full pb-4 border-b-[1px] md:ml-[35vw] md:mt-[5vh] border-b-background-fill grid grid-cols-[20%_80%] items-center"
              key={`${info[0]}_icon`}
            >
              {info[0] === "home" ? (
                <Md.MdHome />
              ) : info[0] === "work" ? (
                <Md.MdWork />
              ) : info[0] === "description" ? (
                <Md.MdDescription />
              ) : info[0] === "person" ? (
                <Md.MdPerson />
              ) : (
                <Md.MdInventory />
              )}
              <li key={info[0]}> {` ${info[1]}`}</li>
            </div>
          );
        })}
      </ul>
    </Tab.Panel>
  );
};
export default UserBasicInfo;
