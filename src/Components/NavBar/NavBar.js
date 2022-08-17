import { useState } from "react";
import * as AiIcons from "react-icons/ai";
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
        className={`md:flex md:items-center md:z-auto md:static absolute bg-black w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 ${
          sidebar ? "top-[-400px]" : "md:justify-center"
        } transition-all ease-in duration-500`}
      >
        <li
          className={`mx-4 my-6 md:my-0 z-1 ${
            sidebar ? null : "hover:bg-gray-200"
          }`}
        >
          <a
            href="#"
            className="text-xl text-white hover:text-cyan-500 duration-500"
          >
            HOME
          </a>
        </li>
        <li className="mx-4 my-6 md:my-0 z-1">
          <a
            href="#"
            className="text-xl text-white hover:text-cyan-500 duration-500"
          >
            ALT HOME
          </a>
        </li>
        <li className="mx-4 my-6 md:my-0 z-1">
          <a
            href="#"
            className="text-xl text-white hover:text-cyan-500 duration-500"
          >
            INCA UN HOME
          </a>
        </li>
      </ul>
    </nav>
  );
}
