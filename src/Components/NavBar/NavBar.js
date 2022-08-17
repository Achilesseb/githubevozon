import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { MenuList } from "./MenuList";
import "./navBar.css";

export function NavBar() {
  const [sidebar, setSidebar] = useState(true);

  const handleSidebar = () => setSidebar(!sidebar);

  return (
    <nav className="p-5 bg-black shadow md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center">
        <span className="text-2xl text-white font-[Poppins]">
          GitHub Project
        </span>

        <span>
          <AiIcons.AiOutlineMenu
            onClick={() => handleSidebar()}
            className="text-white text-3xl cursor-pointer md:hidden block"
          />
        </span>
      </div>

      <ul
        className={`md:flex md:items-center content-center md:z-auto md:static absolute md:bg-black bg-gray-600 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 ${
          sidebar ? "top-[-400px]" : null
        } transition-all ease-in duration-500`}
      >
        {MenuList.map((data) => {
          return (
            <li className={data.listClassName}>
              <a className={data.anchorClassname}>{data.name}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
