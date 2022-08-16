import { setUserData } from "./redux/actions";
const USER_URL = "https://api.github.com/users/";

export const getData = async (dispatch, username) => {
  const userData = await fetch(`${USER_URL}${username}`);
  const result = await userData.json();
  dispatch(setUserData(result));
};
