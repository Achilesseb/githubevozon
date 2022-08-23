import { loginTypes } from "./login-types";
export const setLoginUser = (data) => ({
  type: loginTypes.SET_LOGIN_USER,
  payload: data,
});

export const setLoggedInUserId = (data) => ({
  type: loginTypes.SET_LOGGED_USER_ID,
  payload: data,
});
