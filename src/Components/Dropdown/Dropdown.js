import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Dropdown() {
  const usersSearchedData = useSelector((data) => data.users.items);
  let usersPrimaryData = [];
  usersSearchedData.forEach((user) => {
    const { avatar_url: avatar, name: fullName, login } = user;
    return usersPrimaryData.push({ avatar, fullName, login });
  });
  return (
    <div className="p-2 bg-blue-200 rounded w-80">
      {/*  USER CONTAINER  */}
      {usersPrimaryData
        .filter((users, index) => index < 5)
        .map((user) => (
          <Link
            key={user.login}
            to={`/${user.login}`}
            className="flex items-center gap-3 p-2 bg-gray-400 rounded hover:bg-gray-600 hover:cursor-pointer"
          >
            <div>
              <img className="w-20 rounded-full" src={user.avatar} />
            </div>
            <div className="flex flex-col justify-around h-20">
              <div className="text-xs font-bold">{user.fullName}</div>
              <div className="text-xs ">{user.login}</div>
            </div>
          </Link>
        ))}
    </div>
  );
}