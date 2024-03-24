import { useEffect } from "react";
import "./Progress.css";

function Progress({ setCurrentPage }) {
  useEffect(() => setCurrentPage("progress"), []);

  return (
    <>
      <h1 className="progress">
        Здесь уже очень скоро будет прогресс — динамика сброса веса и история
        записей
      </h1>
    </>
  );
}

export default Progress;
