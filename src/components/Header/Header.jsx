import "./Header.css";

function Header({ currentPage }) {
  return (
    <>
      <h1 className="header">
        Мой{" "}
        {currentPage === "main"
          ? "дневник"
          : currentPage === "progress"
          ? "прогресс"
          : "профиль"}
      </h1>
    </>
  );
}

export default Header;
