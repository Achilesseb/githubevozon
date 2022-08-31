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
    <div className="p-2 bg-blue-200 rounded w-80 md:flex md:flex-col md:flex-wrap md:max-h-[50vh] md:w-[30vw] md:h-auto gap-2">
      {/*  USER CONTAINER  */}
      {usersPrimaryData
        .filter((users, index) => index <= 5)
        .map((user) => (
          <Link
            key={user.login}
            to={`/${user.login}/info
            `}
            className="flex items-center gap-3 px-2 transition ease-in-out bg-gray-400 rounded md:p-2 hover:bg-gray-600 hover:cursor-pointer"
          >
            <div>
              <img className="w-16 rounded-full md:w-20" src={user.avatar} />
            </div>
            <div className="flex flex-col justify-around h-20 ">
              <div className="text-xs font-bold">{user.type}</div>
              <div className="text-xs ">{user.login}</div>
            </div>
          </Link>
        ))}
    </div>
  );
}
