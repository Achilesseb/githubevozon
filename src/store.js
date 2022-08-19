import { configureStore } from "@reduxjs/toolkit";
import repo_reducer from "./redux/RepositoriesSlice/repositories-reducer";
import user_reducer from "./redux/LoginSlice/login-reducer";

const store = configureStore({
  reducer: {
    repositories: repo_reducer,
    user: user_reducer,
  },
});
export default store;
