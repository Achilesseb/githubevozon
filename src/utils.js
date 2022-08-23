import { setLoginUser } from "./redux/LoginSlice/login-actions";
import {
  setContentFromRepository,
  setDataForBranches,
  setDataForNesting,
  setProfileBranch,
  setUserData,
  setUserRepositories,
  setUserRepository,
  setUsersSearched,
} from "./redux/RepositoriesSlice/repositories-actions";

export const PAGINATION_NUMBER = 6;

// Calc percent for Code Lines
export const colors = {
  JavaScript: "red-600",
  HTML: "yellow-400",
  CSS: "blue-700",
  SCSS: "green-600",
  JSON: "[#f37c27]",
  TypeScript: "[#f327c0]",
  Shell: "[#27aff3]",
  Other: "[#a5f327]",
};
export const lines = {};
// Calc percent of line codes
export const calcPercent = (languagesUsed) => {
  let allLineCodes = [];
  let percent;

  languagesUsed.map((code) => {
    allLineCodes.push(code[1]);
  });
  const sumOfLines = allLineCodes.reduce((a, b) => a + b, 0);
  languagesUsed.map((language) => {
    percent = (language[1] / sumOfLines) * 100;
    lines[language[0]] = {
      percent: percent.toFixed(2),
      lines: language[1],
    };
  });
};

// ----------------------------- //

const USER_URL = "https://api.github.com/user/";
const USERS_URL = "https://api.github.com/users/";
const SEARCH_USERS_URL = "https://api.github.com/search/users";
const USER_REPOSITORY_URL = "https://api.github.com/repos/";

// Get USER DATA
export const getData = async (dispatch, username) => {
  const userData = await fetch(`${USERS_URL}${username}`);
  const result = await userData.json();
  dispatch(setUserData(result));
};
export const getDataByUserId = async (dispatch, id) => {
  const user = await fetch(`${USER_URL}${Number(id)}`);
  const result = await user.json();
  dispatch(setLoginUser(result));
};
// Get USERS DATA
export const getUsers = async (dispatch, username) => {
  const userData = await fetch(`${SEARCH_USERS_URL}?q=${username}`);
  const result = await userData.json();
  dispatch(setUsersSearched(result));
};

// GET REPOSITORIES FOR A SPECIFIC USER
export const getRepositoryData = async (dispatch, username, sortBy = 'updated', direction = 'desc') => {
  const url = new URL(`${USERS_URL}${username}/repos`);
  url.search = new URLSearchParams({sort: sortBy, direction});
  const repositories = await fetch(url);
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
  repoName,
  ad
) => {
  const repository = await fetch(
    `${USER_REPOSITORY_URL}${username}/${repoName}/contents/${ad
      .join("/")
      .replaceAll(",", "")}`
  );
  const result = await repository.json();
  dispatch(setContentFromRepository(result));
};

// GET DATA FOR NESTING FILES
export const getDataForNesting = async (dispatch, fileURL) => {
  const repository = await fetch(fileURL);
  const result = await repository.json();
  dispatch(setDataForNesting(result));
};

// GET DATA FOR BRANCHES
export const getDataForBranches = async (dispatch, login, repositoryName) => {
  const branches = await fetch(
    `${USER_REPOSITORY_URL}${login}/${repositoryName}/branches`
  );
  const result = await branches.json();
  dispatch(setDataForBranches(result));
  getProfileBranches(dispatch, await result.map((res) => res.commit.url));
};

// GET PROFILE BRANCH
export const getProfileBranches = async (dispatch, urls) => {
  const fetchLinks = urls.map((url) => fetch(url));
  const responses = Promise.all(fetchLinks).then((result) =>
    result.map((res) => res.json())
  );
  responses.then((res) => {
    res.map((res) => res.then((re) => dispatch(setProfileBranch(re))));
  });
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
