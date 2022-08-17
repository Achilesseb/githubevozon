import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../utils";
import { Dropdown } from "./Dropdown";
import "./landingPage.css";

export function LandingPage() {
  const dispatch = useDispatch();
  const userPrimaryData = useSelector((data) => data.user);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRepos();
  };
  const searchRepos = () => {
    setLoading(true);
    getData(dispatch, username);
    setLoading(false);
    userPrimaryData.length > 0 && console.log(userPrimaryData);
  };
  // useEffect(() => {
  //   setLoading(!loading);
  //   getData(dispatch, username);
  //   setLoading(!loading);
  //   console.log(userPrimaryData);
  // }, [username]);

  return (
    <div>
      <div style={{ width: "300px" }} className="header">
        <form>
          <input
            value={username}
            className="input-username"
            placeholder="GitHub Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="button" onClick={handleSubmit}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        {userPrimaryData.length > 0 &&
          userPrimaryData.map((user) => {
            console.log(user);
            return <Dropdown />;
          })}
      </div>
    </div>
  );
}
