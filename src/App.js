import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./Components/LandingPage/LandingPage.js";
import UserPage from "./Components/UserPage/UserPage.jsx";
import LoginPage from "./Components/LoginPage/LoginPage";
import { NavBar } from "./Components/NavBar/NavBar";
import { useSelector } from "react-redux";
import { RootFile } from "./Components/UserPage/UserRepositories/RootFile";
import CodeViewer from "./Components/CodeViewer/CodeViewer";
import { RepositoryPage } from "./Components/UserPage/UserRepositories/RepositoryPage";
import UserBasicInfo from "./Components/UserPage/UserBasicInfo/UserBasicInfo";
import UserRepositories from "./Components/UserPage/UserRepositories/UserRepositories";
import LanguageUsed from "./Components/UserPage/UserRepositories/LanguageUsed";
function App() {
  const data = useSelector((data) => data);
  console.log(data);
  return (
    <div className="flex flex-col justify-start w-full h-full align-top bg-background-fill">
      <div className="navbar">
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
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
        </Route>
        <Route
          exact
          path={`/:login/repos/:repositoryName`}
          element={<RepositoryPage />}
        >
          <Route path="" element={<LanguageUsed />} />
          <Route path="commits" element={<LanguageUsed />} />
          <Route path="merges" element={<LanguageUsed />} />
          <Route path={`files/*`} element={<RootFile />} />
          <Route path={`:pathname/viewer`} element={<CodeViewer />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
