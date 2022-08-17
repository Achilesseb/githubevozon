import { useDispatch, useSelector } from "react-redux";
import "./dropdown.css";

export function Dropdown() {
  const userPrimaryData = useSelector((data) => data.user);
  const { avatar_url, name, login } = userPrimaryData[0];

  return (
    <div className="w-80 bg-blue-200 p-2 rounded">
      {/*  USER CONTAINER  */}
      <div className="bg-gray-400 p-2 rounded flex gap-3 items-center hover:bg-gray-600 hover:cursor-pointer">
        <div>
          <img className="w-20 rounded-full" src={avatar_url} />
        </div>
        <div className="h-20 flex flex-col justify-around">
          <div className="font-bold text-xs">{name}</div>
          <div className=" text-xs">{login}</div>
        </div>
      </div>
    </div>
  );
}
