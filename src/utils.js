import { setUserData, setUserRepositories } from "./redux/actions";
export const PAGINATION_NUMBER = 6;
const USER_URL = "https://api.github.com/users/";

export const getData = async (dispatch, username) => {
  const userData = await fetch(`${USER_URL}${username}`);
  const result = await userData.json();

  dispatch(setUserData(result));
};
export const getRepositoryData = async (dispatch, username) => {
  const repositories = await fetch(`${USER_URL}${username}/repos`);
  const result = await repositories.json();
  dispatch(setUserRepositories(result));
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
