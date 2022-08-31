import { setLoginUser } from "./redux/LoginSlice/login-actions";
import {
  setContentFromRepository,
  setDataForBranches,
  setDataForCommits,
  setDataForNesting,
  setProfileBranch,
  setUserData,
  setUserRepositories,
  setUserRepository,
  setUsersSearched,
  setContributors,
} from "./redux/RepositoriesSlice/repositories-actions";

export const PAGINATION_NUMBER = 6;

// Calc percent for Code Lines
export const colors = {
  JavaScript: {
    shadow: "shadow-[red]",
    background: "bg-red-200",
    color: "stroke-[red]",
  },
  HTML: {
    shadow: "shadow-[yellow]",
    background: "bg-yellow-200",
    color: "stroke-[yellow]",
  },
  CSS: {
    shadow: "shadow-[blue]",
    background: "bg-blue-200",
    color: "stroke-[blue]",
  },
  SCSS: {
    shadow: "shadow-[green]",
    background: "bg-green-200",
    color: "stroke-[green]",
  },
  JSON: {
    shadow: "[#f37c27]",
    background: "bg-[#f37c27]",
    color: "stroke-[#f37c27]",
  },
  TypeScript: {
    shadow: "[#f327c0]",
    background: "bg-[#f327c0]",
    color: "stroke-[#f327c0]",
  },
  Shell: {
    shadow: "[#27aff3]",
    background: "bg-[#27aff3]",
    color: "stroke-[#27aff3]",
  },
  C: {
    shadow: "shadow-[#A9005C]",
    background: "bg-[#A9005C]",
    color: "stroke-[#A9005C]",
  },
  "C++": {
    shadow: "shadow-[#B1626C]",
    background: "bg-[#B1626C]",
    color: "stroke-[#B1626C]",
  },
  Python: {
    shadow: "shadow-[#D18A00]",
    background: "bg-[#D18A00]",
    color: "stroke-[#D18A00]",
  },
  Dockerfile: {
    shadow: "shadow-[#4D068D]",
    background: "bg-[#4D068D]",
    color: "stroke-[#4D068D]",
  },
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
      style: {
        width: `${percent.toFixed(2)}%`,
      },
      percent: percent.toFixed(2),
      lines: language[1],
    };
  });
};

// ----------------------------- //
const GIT_HUB_URL = "https://api.github.com/";
const USER_URL = `${GIT_HUB_URL}user/`;
const USERS_URL = `${GIT_HUB_URL}users/`;
const SEARCH_USERS_URL = `${GIT_HUB_URL}search/users`;
const USER_REPOSITORY_URL = `${GIT_HUB_URL}repos/`;

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
export const getRepositoryData = async (
  dispatch,
  username,
  sortBy = "updated",
  direction = "desc"
) => {
  const url = new URL(`${USERS_URL}${username}/repos`);
  url.search = new URLSearchParams({ sort: sortBy, direction });
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

// GET DATA FOR COMMITS
export const getDataForCommits = async (dispatch, login, repositoryName) => {
  const commits = await fetch(
    `${USER_REPOSITORY_URL}${login}/${repositoryName}/commits`
  );
  const result = await commits.json();
  dispatch(setDataForCommits(result));
};

// GET DATA FOR CONTRIBUTORS
export const getDataForContributors = async (
  dispatch,
  login,
  repositoryName
) => {
  const contributors = await fetch(
    `${USER_REPOSITORY_URL}${login}/${repositoryName}/contributors`
  );
  const result = await contributors.json();
  dispatch(setContributors(result));
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
