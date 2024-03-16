import { useEffect } from "react";
import "./Profile.css";

function Profile({ setCurrentPage }) {
  useEffect(() => setCurrentPage("profile"), []);

  return (
    <>
      <h1>Профиль</h1>
    </>
  );
}

export default Profile;
