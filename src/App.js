import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./Components/LandingPage/LandingPage.js";
import UserPage from "./Components/UserPage/UserPage.jsx";
import { useSelector } from "react-redux";
import { RepositoryPage } from "./Components/UserRepositories/RepositoryPage";
import usePaginationHook from "./customHooks/customPaginationHook";

function App() {
  const { login } = useSelector((data) => data.user);
  // const { reposOnPage } = usePaginationHook();
  // console.log(reposOnPage);

  return (
    <div className="flex flex-col justify-start w-full h-screen p-1 py-2 align-top bg-background-fill">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path={`/:login`} element={<UserPage />} />
          <Route
            path={`/:login/:repositoryName`}
            element={<RepositoryPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
