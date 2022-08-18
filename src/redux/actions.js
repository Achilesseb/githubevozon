import { types } from "./types";
export const setUserData = (data) => ({
  type: types.SET_USER_DATA,
  payload: data,
});
export const setUserRepositories = (data) => ({
  type: types.SET_USER_REPOSITORIES,
  payload: data,
});
export const setUsersSearched = (data) => ({
  type: types.SET_USERS_SEARCHED,
  payload: data,
});
