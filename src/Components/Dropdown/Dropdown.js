import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Dropdown() {
  const usersSearchedData = useSelector(
    (data) => data.repositories.users.items
  );
  const data = useSelector((data) => data);
  let usersPrimaryData = [];
  usersSearchedData.forEach((user) => {
    const { avatar_url: avatar, type: type, login } = user;
    return usersPrimaryData.push({ avatar, type, login });
  });
  return (
    <div className="w-80 p-2 bg-blue-200 rounded">
      {/*  USER CONTAINER  */}
      {usersPrimaryData
        .filter((users, index) => index < 5)
        .map((user) => (
          <Link
            key={user.login}
            to={`/${user.login}/info
            `}
            className="flex items-center gap-3 p-2 transition ease-in-out bg-gray-400 rounded hover:bg-gray-600 hover:cursor-pointer"
          >
            <div>
              <img className="w-20 rounded-full" src={user.avatar} />
            </div>
            <div className="flex flex-col justify-around h-20">
              <div className="text-xs font-bold">{user.type}</div>
              <div className="text-xs ">{user.login}</div>
            </div>
          </Link>
        ))}
    </div>
  );
}
