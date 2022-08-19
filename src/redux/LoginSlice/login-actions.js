import { loginTypes } from "./login-types";
export const setLoginUser = (data) => ({
  type: loginTypes.SET_LOGIN_USER,
  payload: data,
});
