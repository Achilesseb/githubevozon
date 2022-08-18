import { useDispatch, useSelector } from "react-redux";
import "./dropdown.css";
import { Link } from "react-router-dom";

export function Dropdown() {
  const userPrimaryData = useSelector((data) => data.user);
  const { avatar_url, name, login } = userPrimaryData;

  return (
    <div className="p-2 bg-blue-200 rounded w-80">
      {/*  USER CONTAINER  */}
      <Link
        to={`/${login}`}
        className="flex items-center gap-3 p-2 bg-gray-400 rounded hover:bg-gray-600 hover:cursor-pointer"
      >
        <div>
          <img className="w-20 rounded-full" src={avatar_url} />
        </div>
        <div className="flex flex-col justify-around h-20">
          <div className="text-xs font-bold">{name}</div>
          <div className="text-xs ">{login}</div>
        </div>
      </Link>
    </div>
  );
}
