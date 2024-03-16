import "./Main.css";
import Cards from "../Cards/Cards";

function Main() {
  const date = new Date();
  const options = {
    month: "long",
    day: "numeric",
    weekday: "long",
  };

  return (
    <main className="main">
      <p className="main__data">{date.toLocaleString("ru", options)}</p>
      <section className="main__graphics">
        <div className="main__graphics-circle">
          <h2>1100</h2>
          <span>осталось</span>
        </div>
      </section>
      <section className="main__add-graphics">
        <ul className="main__add-graphics-list">
          <li className="main__add-graphics-list-item">
            <span>Углеводы</span>
            <div></div>
            <span>0/100 г</span>
          </li>
          <li className="main__add-graphics-list-item">
            <span>Белки</span>
            <div></div>
            <span>0/105 г</span>
          </li>
          <li className="main__add-graphics-list-item">
            <span>Жиры</span>
            <div></div>
            <span>0/60 г</span>
          </li>
        </ul>
      </section>
      <Cards />
    </main>
  );
}

export default Main;
