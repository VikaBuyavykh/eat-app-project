import { useEffect, useState } from "react";
import axios from "axios";
import "./Main.css";
import Cards from "../Cards/Cards";
import Popup from "../Popup/Popup";

function Main({ setCurrentPage }) {
  //hardcode
  const CCALS_PER_DAY = 1100;

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [cards, setCards] = useState([]);
  const [ccalsList, setCcalsList] = useState([]);
  const [ccals, setCcals] = useState(0);

  const date = new Date();
  const options = {
    month: "long",
    day: "numeric",
    weekday: "long",
  };

  ///hardcode
  let dd = date.getDate() - 1;

  if (dd < 10) dd = "0" + dd;
  let mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;
  const yyyy = date.getFullYear();

  function calc(data) {
    const array = data.map((meal) => {
      //ccals гду-то теряется, хотя я в хуке проверяю условия длины обоих массивов
      const ccals = ccalsList.find((prod) => prod.name === meal.text).ccals;
      return Math.round((meal.grams * ccals) / 100);
    });
    setCcals(array.reduce((a, b) => a + b, 0));
  }

  async function getCards() {
    try {
      const { data } = await axios.get(
        "https://5a5adfe6f3c47fd1.mokky.dev/days"
      );
      const dateMeals = data.find(
        (day) => day.day === `${dd}.${mm}.${yyyy}`
      ).meals;
      setCards(dateMeals);
    } catch (error) {
      console.log(error);
    }
  }

  function handlePopupClick() {
    isPopupVisible ? setIsPopupVisible(false) : setIsPopupVisible(true);
  }

  async function getCcalsList() {
    try {
      const { data } = await axios.get(
        "https://5a5adfe6f3c47fd1.mokky.dev/products"
      );
      setCcalsList(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setCurrentPage("main");
    getCards();
    getCcalsList();
  }, []);

  useEffect(() => {
    ccalsList.length > 0 && cards.length > 0 && calc(cards);
  }, [ccalsList]);

  return (
    <main className="main">
      <p className="main__data">{date.toLocaleString("ru", options)}</p>
      <section className="main__graphics">
        <div className="main__graphics-circle">
          <h2>{CCALS_PER_DAY - ccals >= 0 ? CCALS_PER_DAY - ccals : 0}</h2>
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
      <Cards
        cards={cards}
        ccalsList={ccalsList}
        date={date}
        handlePopupClick={handlePopupClick}
        setSelectedMealId={setSelectedMealId}
      />
      <Popup
        handlePopupClick={handlePopupClick}
        isPopupVisible={isPopupVisible}
        selectedMealId={selectedMealId}
        cards={cards}
      />
    </main>
  );
}

export default Main;
