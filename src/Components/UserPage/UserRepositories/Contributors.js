import { Link } from "react-router-dom";

const Contributors = ({ index, contributor }) => {
  return (
    <Link to={`/${contributor.login}/info`}>
      <div key={index} className="flex hover:bg-blue-200 gap-2">
        <img src={contributor.avatar_url} className="rounded-full w-6" />
        <div>{contributor.login}</div>
      </div>
    </Link>
  );
};

export default Contributors;
