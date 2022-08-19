import {
  setContentFromRepository,
  setUserData,
  setUserRepositories,
  setUserRepository,
  setUsersSearched,
} from "./redux/RepositoriesSlice/repositories-actions";
export const PAGINATION_NUMBER = 6;
const USER_URL = "https://api.github.com/users/";
const SEARCH_USERS_URL = "https://api.github.com/search/users";
const USER_REPOSITORY_URL = "https://api.github.com/repos/";

// Get USER DATA
export const getData = async (dispatch, username) => {
  const userData = await fetch(`${USER_URL}${username}`);
  const result = await userData.json();
  dispatch(setUserData(result));
};

// Get USERS DATA
export const getUsers = async (dispatch, username) => {
  const userData = await fetch(`${SEARCH_USERS_URL}?q=${username}`);
  const result = await userData.json();
  dispatch(setUsersSearched(result));
};

// GET REPOSITORIES FOR A SPECIFIC USER
export const getRepositoryData = async (dispatch, username) => {
  const repositories = await fetch(`${USER_URL}${username}/repos`);
  const result = await repositories.json();
  dispatch(setUserRepositories(result));
};

// GET A SPECIFIC REPOSITORY FOR A SPECIFIC USER
export const getSpecificRepositoryData = async (
  dispatch,
  username,
  repoName
) => {
  const repository = await fetch(
    `${USER_REPOSITORY_URL}${username}/${repoName}`
  );
  const result = await repository.json();
  dispatch(setUserRepository(result));
};

// GET CONTENT FROM A REPOSITORY FOR A SPECIFIC USER
export const getContentFromRepositoryData = async (
  dispatch,
  username,
  repoName
) => {
  const repository = await fetch(
    `${USER_REPOSITORY_URL}${username}/${repoName}/contents`
  );
  const result = await repository.json();
  dispatch(setContentFromRepository(result));
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const daysInYear = (year) => {
  return year % 4 === 0 && year % 100 !== 0 ? 366 : 365;
};
export const timeSince = (date) => {
  const yearDays = daysInYear(new Date().getFullYear());
  const yearSeconds = 60 * 60 * 24 * yearDays;
  const monthSeconds = yearSeconds / 12;
  const daySeconds = monthSeconds / 30;
  const hourSeconds = daySeconds / 24;
  const minuteSeconds = hourSeconds / 60;
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / yearSeconds;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / monthSeconds;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / daySeconds;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / hourSeconds;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / minuteSeconds;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};
