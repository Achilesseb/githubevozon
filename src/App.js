import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./Components/LandingPage/LandingPage.js";
import UserPage from "./Components/UserPage/UserPage.jsx";
import LoginPage from "./Components/LoginPage/LoginPage";
import { NavBar } from "./Components/NavBar/NavBar";
import { RootFile } from "./Components/UserPage/UserRepositories/RootFile";
import CodeViewer from "./Components/CodeViewer/CodeViewer";
import { RepositoryPage } from "./Components/UserPage/UserRepositories/RepositoryPage";
import UserBasicInfo from "./Components/UserPage/UserBasicInfo/UserBasicInfo";
import UserRepositories from "./Components/UserPage/UserRepositories/UserRepositories";
import LanguageUsed from "./Components/UserPage/UserRepositories/LanguageUsed";
import UserActivity from "./Components/UserPage/UserActivity/UserActivity";
import Commits from "./Components/UserPage/UserRepositories/Commits";
import MainPaigRepo from "./Components/UserPage/UserRepositories/MainPageRepo";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
function App() {
  return (
    <div className="flex flex-col justify-start w-full h-full align-top bg-background-fill">
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path={`/:login`} element={<UserPage />}>
          <Route path="" element={<Navigate to="info" />} />
          <Route
            path="info"
            element={<UserBasicInfo idx="basic-info" key="basic-info" />}
          />
          <Route
            path="repos"
            element={<UserRepositories idx="repositories" key="repositories" />}
          />
          <Route path="activity" element={<UserActivity />} />
        </Route>
        <Route
          exact
          path={`/:login/repos/:repositoryName`}
          element={<RepositoryPage />}
        >
          <Route path="" element={<MainPaigRepo />} />
          <Route path="commits" element={<Commits />} />
          {/* <Route path="merges" element={<Merges />} /> */}
          <Route path={`files/*`} element={<RootFile />} />
          <Route path={`:pathname/viewer`} element={<CodeViewer />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
