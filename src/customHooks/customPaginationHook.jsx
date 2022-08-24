import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PAGINATION_NUMBER as increaser } from "../utils";
import { timeSince } from "../utils";
const usePaginationHook = (data = []) => {
  const [sortByName, setSortByName] = useState(false);
  const [filteredDataArray, setfilteredDataArray] = useState(data);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [dataOnPage, setDataOnPage] = useState(null);

  let maxPage = 99999;
  let repositoriesData = [];

  useEffect(() => {
    let filteredDataArray = data.filter(
      (repo) =>
        repo.name.toLowerCase().includes(filter.toLowerCase()) || filter === ""
    );
    setfilteredDataArray(filteredDataArray);
  }, [filter]);
  useEffect(() => {
    setData();
  }, [filteredDataArray, page, filter]);
  useEffect(() => {
    setfilteredDataArray(data);
  }, [data]);
  filteredDataArray?.forEach((repo) => {
    if (!repo.commit) {
      const { name, language, updated_at, visibility } = repo;
      const howLongAgo = timeSince(new Date(updated_at));
      repositoriesData.push({
        repoName: name,
        language,
        Last_update: `${howLongAgo} ago`,
        visibility,
      });
    } else {
      const { name, commit } = repo;
      repositoriesData.push({ name: name, commit: commit });
    }
  });

  const changePage = (direction) => {
    direction.toLowerCase() === "next" ? setPage(page + 1) : setPage(page - 1);
  };
  const setData = () => {
    if (repositoriesData.length !== 0)
      maxPage = Math.ceil(repositoriesData.length / increaser);
    if (page === maxPage) setPage(0);
    if (page < 0) setPage(maxPage - 1);
    let startIndex = 1;
    return setDataOnPage(
      repositoriesData.slice(
        page * startIndex * increaser,
        page * increaser + increaser
      )
    );
  };

  return {
    dataOnPage,
    changePage,
    page,
    filter,
    setFilter,
    sortByName,
    setSortByName,
  };
};
export default usePaginationHook;
