import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Progress from "../Progress/Progress";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentPage, setCurrentPage] = useState("main");

  function isSbmtDisabled(e) {
    const hasNoEmptyInput = Array.from(
      e.currentTarget.querySelectorAll("input")
    ).every((item) => item.value !== "");
    const isFormInvalid = Array.from(
      e.currentTarget.querySelectorAll("span")
    ).some((error) => error.textContent !== "");
    const sbmtDisability = isFormInvalid || !hasNoEmptyInput;
    return sbmtDisability;
  }

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div className="app">
      <div className="app__content">
        <div className="app__content_info">
          {isLoggedIn && <Header currentPage={currentPage} />}
          <Routes>
            <Route
              path="/register"
              element={
                <Register
                  isSbmtDisabled={isSbmtDisabled}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  isSbmtDisabled={isSbmtDisabled}
                  setCurrentUser={setCurrentUser}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              path="/"
              element={
                <Main
                  setCurrentPage={setCurrentPage}
                  isSbmtDisabled={isSbmtDisabled}
                />
              }
            />
            <Route
              path="/progress"
              element={<Progress setCurrentPage={setCurrentPage} />}
            />
            <Route
              path="/profile"
              element={
                <Profile
                  setCurrentPage={setCurrentPage}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  setIsLoggedIn={setIsLoggedIn}
                  isSbmtDisabled={isSbmtDisabled}
                />
              }
            />
          </Routes>
        </div>
        {isLoggedIn && <Footer />}
      </div>
    </div>
  );
}

export default App;
