import { useEffect } from "react";
import "./Progress.css";

function Progress({ setCurrentPage }) {
  useEffect(() => setCurrentPage("progress"), []);

  return (
    <>
      <h1>Прогресс</h1>
    </>
  );
}

export default Progress;
