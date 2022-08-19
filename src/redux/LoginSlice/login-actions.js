import { loginTypes } from "./login-types";
export const setLoginUserId = (data) => ({
  type: loginTypes.SET_LOGIN_USER,
  payload: data,
});
