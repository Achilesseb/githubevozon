import { Link } from "react-router-dom";

const Contributors = ({ index, contributor }) => {
  return (
    <Link to={`/${contributor.login}/info`}>
      <div key={index} className="flex gap-2 hover:bg-gray-400">
        <img src={contributor.avatar_url} className="w-6 rounded-full" />
        <div>{contributor.login}</div>
      </div>
    </Link>
  );
};

export default Contributors;
