import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./Components/LandingPage/LandingPage.js";
import UserPage from "./Components/UserPage/UserPage.jsx";
import LoginPage from "./Components/LoginPage/LoginPage";
import { NavBar } from "./Components/NavBar/NavBar";
import { RepositoryPage } from "./Components/UserPage/UserRepositories/RepositoryPage";
import { useSelector } from "react-redux";
function App() {
  const data = useSelector((data) => data);
  console.log(data);
  return (
    <div className="flex flex-col justify-start w-full h-full align-top bg-background-fill">
      <Router>
        <div className="navbar">
          <NavBar />
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
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
