import { useEffect, useState } from "react";
import axios from "axios";
import MainContext from "../../utils/MainContext";
import "./Main.css";
import Cards from "../Cards/Cards";
import Popup from "../Popup/Popup";

function Main({ setCurrentPage }) {
  //ccals
  const CCALS_PER_DAY = 1100;
  //prot
  const PROT_PROPORTION = 26;
  const PROT_CCALS_OF_A_GRAM = 4;
  const PROT_PER_DAY = (
    (CCALS_PER_DAY * PROT_PROPORTION) /
    PROT_CCALS_OF_A_GRAM /
    100
  ).toFixed(1);
  //fat
  const FAT_PROPORTION = 33;
  const FAT_CCALS_OF_A_GRAM = 9.2;
  const FAT_PER_DAY = (
    (CCALS_PER_DAY * FAT_PROPORTION) /
    FAT_CCALS_OF_A_GRAM /
    100
  ).toFixed(1);
  //carbs
  const CARBS_PROPORTION = 41;
  const CARBS_CCALS_OF_A_GRAM = 4.1;
  const CARBS_PER_DAY = (
    (CCALS_PER_DAY * CARBS_PROPORTION) /
    CARBS_CCALS_OF_A_GRAM /
    100
  ).toFixed(1);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [cards, setCards] = useState([]);
  const [ccalsList, setCcalsList] = useState([]);
  const [ccals, setCcals] = useState(0);
  const [prot, setProt] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);

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

  function calc(meals) {
    const ccalsArr = [];
    const protArr = [];
    const fatArr = [];
    const carbsArr = [];
    meals.forEach((meal) => {
      const mealInfo = ccalsList.find((prod) => prod.name === meal.text);

      const ccals = mealInfo.ccals;
      const prot = mealInfo.prot;
      const fat = mealInfo.fat;
      const carbs = mealInfo.carbs;

      ccalsArr.push(Math.round((meal.grams * ccals) / 100));
      protArr.push((meal.grams * prot) / 100);
      fatArr.push((meal.grams * fat) / 100);
      carbsArr.push((meal.grams * carbs) / 100);
    });
    setCcals(ccalsArr.reduce((a, b) => a + b, 0));
    setProt(protArr.reduce((a, b) => a + b, 0).toFixed(1));
    setFat(fatArr.reduce((a, b) => a + b, 0).toFixed(1));
    setCarbs(carbsArr.reduce((a, b) => a + b, 0).toFixed(1));
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
    if (ccalsList.length > 0 && cards.length > 0) {
      calc(cards);
    }
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
            <span>Белки</span>
            <div></div>
            <span>
              {prot}/{PROT_PER_DAY} г
            </span>
          </li>
          <li className="main__add-graphics-list-item">
            <span>Жиры</span>
            <div></div>
            <span>
              {fat}/{FAT_PER_DAY} г
            </span>
          </li>
          <li className="main__add-graphics-list-item">
            <span>Углеводы</span>
            <div></div>
            <span>
              {carbs}/{CARBS_PER_DAY} г
            </span>
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
      <MainContext.Provider
        value={{ CCALS_PER_DAY, PROT_PER_DAY, FAT_PER_DAY, CARBS_PER_DAY }}
      >
        <Popup
          handlePopupClick={handlePopupClick}
          isPopupVisible={isPopupVisible}
          selectedMealId={selectedMealId}
          cards={cards}
          ccalsList={ccalsList}
        />
      </MainContext.Provider>
    </main>
  );
}

export default Main;
