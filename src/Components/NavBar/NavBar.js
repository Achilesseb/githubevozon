import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { MenuList } from "./MenuList";

export function NavBar() {
  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => setSidebar(!sidebar);

  return (
    <nav className="h-[10vh] p-2 shadow bg-tab-fill md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between">
        <span className="text-2xl text-white font-[Poppins]">
          GitHub Project
        </span>

        <span>
          <AiIcons.AiOutlineMenu
            onClick={() => handleSidebar()}
            className="block text-3xl text-white cursor-pointer md:hidden"
          />
        </span>
      </div>
      {sidebar === true ? (
        <ul
          className={`md:flex md:items-center w-full content-center md:z-auto md:static absolute md:bg-black bg-tab-fill z-20 right-0 md:w-auto md:py-0 py-2 md:pl-0 pl-2 md:opacity-100 transition ease-in-out duration-5000`}
        >
          {MenuList.map((data, index) => {
            return (
              <li key={index} className={data.listClassName}>
                <Link
                  to={data?.to}
                  className={data.anchorClassname}
                  onClick={() => setSidebar(!sidebar)}
                >
                  {data.name}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </nav>
  );
}
