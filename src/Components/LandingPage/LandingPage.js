import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getData } from "../../utils";
export function LandingPage() {
  const dispatch = useDispatch();
  const userPrimaryData = useSelector((data) => data.user);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   searchRepos();
  // };
  // const searchRepos = () => {
  //   setLoading(true);
  //   getData(dispatch, username);
  //   setLoading(false);
  // };
  useEffect(() => {
    setLoading(!loading);
    getData(dispatch, username);
    setLoading(!loading);
  }, [username]);

  return (
    <div>
      <div>
        <form>
          <input
            className="input-username"
            placeholder="GitHub Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <button className="button" onClick={handleSubmit}>
            {loading ? "Searching..." : "Search"}
          </button> */}
        </form>
        <Link to={`${username}`}>
          <div>{userPrimaryData.name}</div>
        </Link>
      </div>
    </div>
  );
}
