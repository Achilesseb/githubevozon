import { types } from "./repositories-types";
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
export const setUserRepository = (data) => ({
  type: types.SET_USER_REPOSITORY,
  payload: data,
});
export const setContentFromRepository = (data) => ({
  type: types.SET_USER_CONTENT,
  payload: data,
});
export const setDataForNesting = (data) => ({
  type: types.SET_DATA_FOR_NESTING,
  payload: data,
});
export const setDataForBranches = (data) => ({
  type: types.SET_DATA_FOR_BRANCHES,
  payload: data,
});
export const setDataForCommits = (data) => ({
  type: types.SET_DATA_FOR_COMMITS,
  payload: data,
});
export const setProfileBranch = (data) => ({
  type: types.SET_DATA_FOR_PROFILE_BRANCHES,
  payload: data,
});
export const setContributors = (data) => ({
  type: types.SET_DATA_FOR_CONTRIBUTORS,
  payload: data,
});
