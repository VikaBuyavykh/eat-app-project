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
      <section className="main__graphic">
        <div className="main__graphic-circle">
          <h2>1100</h2>
          <span>осталось</span>
        </div>
      </section>
      <section className="main__add-graphic">
        <ul>
          <li>
            <span>Углеводы</span>
            <div></div>
            <span>0/100 г</span>
          </li>
          <li>
            <span>Белки</span>
            <div></div>
            <span>0/105 г</span>
          </li>
          <li>
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
