import { types } from "./branches-types";

export const INITIAL_BRANCHES = {};

const branch_reducer = (state = INITIAL_BRANCHES, action, branchName) => {
  switch (action.type) {
    case types.SET_PROFILE_BRANCHES: {
      return { ...state, [action.branchName]: action.payload };
    }
    case types.DELETE_BRANCHES: {
      return Object.keys(INITIAL_BRANCHES).forEach(
        (key) => delete INITIAL_BRANCHES[key]
      );
    }
    default: {
      return state;
    }
  }
};

export default branch_reducer;
