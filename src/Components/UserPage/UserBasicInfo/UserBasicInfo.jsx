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
    followers,
    following,
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
    <Tab.Panel key="basic-info" className="w-full h-full p-8 align-middle ">
      <ul className="flex flex-col items-center h-full gap-4 font-serif text-white justify-evenly text-s">
        {Object.entries(userBasicInfo).map((info) => {
          console.log(info[0].charAt(0).toUpperCase() + info[0].slice(1));
          const icons = `Md${
            info[0].charAt(0).toUpperCase() + info[0].slice(1)
          }`;
          console.log(icons);
          console.log(Md[icons]);
          if (!info[1]) return;
          return info[0] === "avatar" ? (
            dotLoaderStatus === true ? (
              <div className="h-[30vh] align-middle content-center order-first">
                <DotLoader size="20vh" key="dotLoader" color="#374151" />
              </div>
            ) : (
              <li key={info[0]} className="order-first mb-2">
                <img
                  src={info[1]}
                  className="shadow-lg shadow-white"
                  style={{ height: "30vh", borderRadius: "50%" }}
                />
              </li>
            )
          ) : info[0] === "blog" ? (
            <div className="order-last">
              <Button type="primary" modifiers="rounded-s w-[150px] h-[50px]">
                <a href={info[1]}>Blog</a>
              </Button>
            </div>
          ) : (
            <div className="w-full pb-4 border-b-[1px] border-b-background-fill grid grid-cols-[20%_80%] items-center">
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
