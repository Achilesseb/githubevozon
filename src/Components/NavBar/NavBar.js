import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogout } from "../../customHooks/customLogOutHook";
import { setLoggedInUserId, setLoginUser } from "../../redux/LoginSlice/login-actions";
import { anchorClassname, listClassName, MenuList } from "./MenuList";

export function NavBar() {
  const [sidebar, setSidebar] = useState(true);
  const dispatch = useDispatch();
  const { logout } = useLogout();
  const { user } = useSelector((data) => data.user);

  const handleSidebar = () => setSidebar(!sidebar);

  const getLogoutButton = () => {
    if(!user) return;
    return <li key={'logout-button'} className={listClassName}>
      <Link
        to={'/'}
        className={anchorClassname}
        onClick={() => {
          logout()
            .then(() => {
              dispatch(setLoginUser(null));
              dispatch(setLoggedInUserId(null));
              console.log("Successfully logged out");
            }).catch(err => {
              console.log("Something went wrong when logging out??", err);
          })
          }
        }
      >
        Logout
      </Link>
    </li>
  }

  return (
    <nav className="h-[10vh] p-2 shadow bg-tab-fill md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between">
        <Link to="/">
          <span className="text-2xl text-white font-[Poppins]">
            GitHub Project
          </span>
        </Link>

        <span>
          <AiIcons.AiOutlineMenu
            onClick={() => handleSidebar()}
            className="block text-3xl text-white cursor-pointer md:hidden"
          />
        </span>
      </div>
      <ul
        className={`md:flex md:items-center w-full content-center md:z-auto md:static absolute ${
          sidebar ? "top-[-200px]" : "top-[40px]"
        } md:top-[0px] bg-tab-fill z-20 right-0 md:w-auto md:py-0 py-2 md:pl-0 pl-2 transition ease-in-out duration-5000`}
      >
        {MenuList.map((data, index) => {
          return (
            <li key={index} className={data.listClassName}>
              <Link
                to={data?.to}
                className={data.anchorClassname}
                onClick={() => setSidebar(!sidebar)}
              >
                {data.name === 'Login' && user ? 'My Profile' : data.name}
              </Link>
            </li>
          );
        })}
        {getLogoutButton()}
      </ul>
    </nav>
  );
}
