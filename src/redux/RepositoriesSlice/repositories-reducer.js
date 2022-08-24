import { types } from "./repositories-types";
const INITIAL_STATE = {
  users: [],
  user: {},
  repositories: [],
  repository: {},
  content: [],
  fileCode: [],
  branches: [],
  commits: [],
  branchesData: [],
  contributors: [],
};
const repo_reducer = (state = INITIAL_STATE, action) => {
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
    case types.SET_DATA_FOR_NESTING: {
      return { ...state, fileCode: action.payload };
    }
    case types.SET_DATA_FOR_BRANCHES: {
      return { ...state, branches: action.payload };
    }
    case types.SET_DATA_FOR_COMMITS: {
      return { ...state, commits: action.payload };
    }
    case types.SET_DATA_FOR_PROFILE_BRANCHES: {
      return {
        ...state,
        branchesData: [...state.branchesData, action.payload],
      };
    }
    case types.SET_DATA_FOR_CONTRIBUTORS: {
      return { ...state, contributors: action.payload };
    }
    default: {
      return state;
    }
  }
};
export default repo_reducer;
