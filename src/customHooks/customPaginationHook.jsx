import { useState, useEffect } from "react";
import { getRepositoryData, getSpecificRepositoryData } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { PAGINATION_NUMBER as increaser } from "../utils";
import { timeSince } from "../utils";
const usePaginationHook = (data) => {
  const [sortByName, setSortByName] = useState(false);
  const [filteredRepositories, setFilteredRepositories] = useState(data);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [reposOnPage, setReposPage] = useState(null);
  const dispatch = useDispatch();
  const handleSort = () => {
    if (sortByName) {
      return (a, b) => (a.name > b.name ? 1 : -1);
    } else {
      return (a, b) => (a.name > b.name ? -1 : 1);
    }
  };

  const { login } = useParams();
  let maxPage = 99999;
  let repositoriesData = [];

  useEffect(() => {
    let filteredRepositories = data.filter(
      (repo) =>
        repo.name?.toLowerCase().includes(filter.toLowerCase()) || filter === ""
    );
    setFilteredRepositories(filteredRepositories);
  }, [filter]);
  useEffect(() => {
    setReposOnPage();
  }, [filteredRepositories, page, filter]);
  useEffect(() => {
    setFilteredRepositories(data);
  }, [data]);
  filteredRepositories?.forEach((repo) => {
    if (repo.id) {
      const { name, language, updated_at, visibility } = repo;
      const howLongAgo = timeSince(new Date(updated_at));
      repositoriesData.push({
        repoName: name,
        language,
        Last_update: `${howLongAgo} ago`,
        visibility,
      });
    } else if (repo.node_id) {
      const { author, commit } = repo;
      repositoriesData.push({ author: author, commit: commit });
    } else {
      const { name, commit } = repo;
      repositoriesData.push({ name: name, commit: commit });
    }
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

  return {
    reposOnPage,
    changePage,
    page,
    filter,
    setFilter,
    handleSort,
    sortByName,
    setSortByName,
  };
};
export default usePaginationHook;
