import { Link, Outlet, useParams } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { options } from "./options";

export function RepositoryPage() {
  const { repositoryName, login } = useParams();
  return (
    <div className="w-auto max-w-[100vw] h-auto min-h-[90vh] flex flex-col gap-4 items-start">
      <div className="mt-2 font-serif w-[100%] text-xl text-center text-white ">
        <Link to={`/${login}/repos/${repositoryName}`}>
          <span>{repositoryName}</span>
        </Link>
      </div>
      <nav className="p-0 h-[10vh] w-[100%] flex flex-row justify-center gap-[2%] ">
        {options.map((option, index) => {
          return (
            <Link to={`${option.to}`} key={index} className="w-[30vw]  ">
              <div className={option.divClassName}>
                <AiIcons.AiOutlineMenu className={option.iconClassName} />
                <span className="md:w-[70%] ">{option.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="flex self-center w-[100%] ">
        <Outlet />
      </div>
    </div>
  );
}
