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
