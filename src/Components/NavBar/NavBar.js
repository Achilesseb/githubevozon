import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogout } from "../../customHooks/customLogOutHook";
import {
  setLoggedInUserId,
  setLoginUser,
} from "../../redux/LoginSlice/login-actions";
import { anchorClassname, listClassName, MenuList } from "./MenuList";

export function NavBar() {
  const [sidebar, setSidebar] = useState(true);
  const dispatch = useDispatch();
  const { logout } = useLogout();
  const { user } = useSelector((data) => data.user);

  const handleSidebar = () => setSidebar(!sidebar);

  const getLogoutButton = () => {
    if (!user) return;
    return (
      <li key={"logout-button"} className={listClassName}>
        <Link
          to={"/"}
          className={anchorClassname}
          onClick={() => {
            logout()
              .then(() => {
                dispatch(setLoginUser(null));
                dispatch(setLoggedInUserId(null));
                console.log("Successfully logged out");
              })
              .catch((err) => {
                console.log("Something went wrong when logging out??", err);
              });
          }}
        >
          Logout
        </Link>
      </li>
    );
  };

  return (
    <nav className="h-[10vh] p-2 shadow bg-tab-fill items-end md:flex md:items-center md:justify-between">
      <div className="z-30 flex items-center justify-between text-center">
        <Link to="/">
          <div className="absolute top-[1%] md:top-[2%] h-[60px] w-[60px]  border-none  z-30">
            <svg
              className=""
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeWidth="0"
                fill="white"
                d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z"
              />
            </svg>
          </div>
        </Link>

        <span>
          <AiIcons.AiOutlineMenu
            onClick={() => handleSidebar()}
            className="absolute left-[90%] top-[3%] text-3xl text-white cursor-pointer mb-2 md:hidden z-30"
          />
        </span>
      </div>
      <ul
        className={`md:flex md:items-center w-full content-center md:z-auto md:static absolute ${
          sidebar ? "top-[-200px]" : "top-[20px]"
        } md:top-[0px] bg-tab-fill/80 z-20 right-0 md:w-auto md:py-0 py-2 md:pl-0 pl-2 transition ease-in-out duration-5000`}
      >
        {MenuList.map((data, index) => {
          return (
            <li key={index} className={data.listClassName}>
              <Link
                to={data?.to}
                className={data.anchorClassname}
                onClick={() => setSidebar(!sidebar)}
              >
                {data.name === "Login" && user ? (
                  <img src={user.avatar_url} className="w-10 rounded-full" />
                ) : (
                  data.name
                )}
              </Link>
            </li>
          );
        })}
        {getLogoutButton()}
      </ul>
    </nav>
  );
}
