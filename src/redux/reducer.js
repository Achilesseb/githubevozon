import { types } from "./types";
const INITIAL_STATE = {
  users: [],
  user: {},
  repositories: [],
  repository: {},
  content: [],
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_USER_DATA: {
      return { ...state, user: action.payload };
    }
    case types.SET_USER_REPOSITORIES: {
      return { ...state, repositories: action.payload };
    }
    case types.SET_USERS_SEARCHED: {
      return { ...state, users: action.payload };
    }
    case types.SET_USER_REPOSITORY: {
      return { ...state, repository: action.payload };
    }
    case types.SET_USER_CONTENT: {
      return { ...state, content: action.payload };
    }
    default: {
      return state;
    }
  }
};
export default reducer;
