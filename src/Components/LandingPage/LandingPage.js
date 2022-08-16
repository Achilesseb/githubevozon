import { useState } from "react";

export function LandingPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRepos();
  };

  async function getData() {
    const userData = await fetch(`https://api.github.com/users/${username}`);
    const result = await userData.json();
    return result;
  }

  const searchRepos = async () => {
    setLoading(true);
    setUser(await getData());
    setLoading(false);
  };

  return (
    <div>
      <div>
        <form>
          <input
            className="input-username"
            value={username}
            placeholder="GitHub Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="button" onClick={handleSubmit}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>
    </div>
  );
}
