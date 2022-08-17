import { useDispatch, useSelector } from "react-redux";
import "./dropdown.css";

export function Dropdown() {
  const userPrimaryData = useSelector((data) => data.user);
  const userData = userPrimaryData[0];

  return (
    <div className="container">
      <div className="">
        <div className="avatar">
          <img src={userData.avatar_url} />
        </div>
        <div className="user-info">
          <div className="user-fullname">{userData.name}</div>
          <div className="user-id">{userData.login}</div>
        </div>
      </div>
    </div>
  );
}
