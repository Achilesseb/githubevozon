import { loginTypes } from "./login-types";

const INITIAL_STATE = {
  user: null,
  id: null
};
const user_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loginTypes.SET_LOGIN_USER: {
      return { ...state, user: action.payload };
    }
    case loginTypes.SET_LOGGED_USER_ID: {
      return { ...state, id: action.payload };
    }
    default: {
      return state;
    }
  }
};
export default user_reducer;
