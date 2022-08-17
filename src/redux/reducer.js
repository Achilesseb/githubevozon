import { types } from "./types";
const INITIAL_STATE = {
  user: [],
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_USER_DATA: {
      return { ...state, user: action.payload };
    }
    default: {
      return state;
    }
  }
};
export default reducer;
