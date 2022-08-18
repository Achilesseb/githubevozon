import { useState, useEffect } from "react";
import { getRepositoryData } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { PAGINATION_NUMBER as increaser } from "../utils";
import { timeSince } from "../utils";
const usePaginationHook = () => {
  const [page, setPage] = useState(0);
  const [reposOnPage, setReposPage] = useState(null);
  const dispatch = useDispatch();
  const userRepositories = useSelector((data) => data);
  const { login } = useParams();
  let maxPage = 99999;
  let repositoriesData = [];
  useEffect(() => {
    getRepositoryData(dispatch, login);
  }, []);
  useEffect(() => {
    setReposOnPage();
  }, [userRepositories.repositories, page]);
  userRepositories.repositories.forEach((repo) => {
    const { name, language, updated_at, visibility } = repo;
    const howLongAgo = timeSince(new Date(updated_at));
    repositoriesData.push({
      repoName: name,
      language,
      Last_update: `${howLongAgo} ago`,
      visibility,
    });
  });
  const changePage = (direction) => {
    direction.toLowerCase() === "next" ? setPage(page + 1) : setPage(page - 1);
  };
  const setReposOnPage = () => {
    if (repositoriesData.length !== 0)
      maxPage = Math.ceil(repositoriesData.length / increaser);
    if (page === maxPage) setPage(0);
    if (page < 0) setPage(maxPage - 1);
    let startIndex = 1;
    return setReposPage(
      repositoriesData.slice(
        page * startIndex * increaser,
        page * increaser + increaser
      )
    );
  };
  return { reposOnPage, changePage, page };
};
export default usePaginationHook;
