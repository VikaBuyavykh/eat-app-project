import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Progress from "../Progress/Progress";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

function App() {
  const [currentPage, setCurrentPage] = useState("main");

  return (
    <div className="app">
      <div className="app__content">
        <div className="app__content_info">
          <Header currentPage={currentPage} />
          <Routes>
            <Route
              path="/"
              element={<Main setCurrentPage={setCurrentPage} />}
            />
            <Route
              path="/progress"
              element={<Progress setCurrentPage={setCurrentPage} />}
            />
            <Route
              path="/profile"
              element={<Profile setCurrentPage={setCurrentPage} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
