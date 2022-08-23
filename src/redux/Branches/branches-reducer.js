import { types } from "./branches-types";

const INITIAL_BRANCHES = {};

const branch_reducer = (state = INITIAL_BRANCHES, action, branchName) => {
  switch (action.type) {
    case types.SET_PROFILE_BRANCHES: {
      return { ...state, [action.branchName]: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default branch_reducer;
