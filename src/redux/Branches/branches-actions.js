import { types } from "./branches-types";

export const setProfileBranch = (data, branchName) => ({
  type: types.SET_PROFILE_BRANCHES,
  payload: data,
  branchName: branchName,
});
