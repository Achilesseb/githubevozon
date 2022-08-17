import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./Components/LandingPage/LandingPage.js";
import UserRepositories from "./Components/UserRepositories/UserRepositories";
import { useSelector } from "react-redux";

function App() {
  const { login } = useSelector((data) => data.user);
  console.log(login);
  return (
    <div className="flex justify-end w-full h-screen p-1 px-2 py-2 sm:px-0 bg-background-fill ">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path={`/${login}`} element={<UserRepositories />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
