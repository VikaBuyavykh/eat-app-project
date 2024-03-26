import { useEffect, useState } from "react";
import axios from "axios";
import MainContext from "../../utils/MainContext";
import useForm from "../../utils/UseForm";
import "./Main.css";
import Cards from "../Cards/Cards";
import Popup from "../Popup/Popup";
import {
  PROT_PROPORTION,
  PROT_CCALS_OF_A_GRAM,
  FAT_PROPORTION,
  FAT_CCALS_OF_A_GRAM,
  CARBS_PROPORTION,
  CARBS_CCALS_OF_A_GRAM,
} from "../../utils/constants";

function Main({ setCurrentPage, isSbmtDisabled, currentUser }) {
  const ccalsPerDay = currentUser.ccal;
  const protPerDay = (
    (ccalsPerDay * PROT_PROPORTION) /
    PROT_CCALS_OF_A_GRAM /
    100
  ).toFixed(1);
  const fatPerDay = (
    (ccalsPerDay * FAT_PROPORTION) /
    FAT_CCALS_OF_A_GRAM /
    100
  ).toFixed(1);
  const carbsPerDay = (
    (ccalsPerDay * CARBS_PROPORTION) /
    CARBS_CCALS_OF_A_GRAM /
    100
  ).toFixed(1);

  const date = new Date();
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;
  const { values, handleChange } = useForm({ date: `${yyyy}-${mm}-${dd}` });

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [cards, setCards] = useState([]);
  const [ccalsList, setCcalsList] = useState([]);
  const [ccals, setCcals] = useState(0);
  const [prot, setProt] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);

  function handlePopupClick() {
    isPopupVisible ? setIsPopupVisible(false) : setIsPopupVisible(true);
  }

  async function handleMealDelete(e) {
    const idToDelete = e.currentTarget.closest(".card").id;
    try {
      await axios.delete(
        `https://5a5adfe6f3c47fd1.mokky.dev/days/${idToDelete}`
      );
      setCards(
        cards.filter((card) => (card.id !== Number(idToDelete) ? card : ""))
      );
    } catch (error) {
      console.log(error);
    }
  }

  function calc(meals) {
    function calculateProperty(prop) {
      return meals
        .map((meal) => {
          const gramsArr = meal.products.map((prod) => prod.grams);
          return meal.products
            .map((prod) => prod.text)
            .map((text) => ccalsList.find((prod) => prod.name === text))
            .map((prod, index) => (prod[prop] * gramsArr[index]) / 100)
            .reduce((a, b) => a + b, 0);
        })
        .reduce((a, b) => a + b, 0)
        .toFixed(1);
    }
    setCcals(Math.round(calculateProperty("ccals")));
    setProt(calculateProperty("prot"));
    setFat(calculateProperty("fat"));
    setCarbs(calculateProperty("carbs"));
  }

  async function getCards() {
    try {
      const { data } = await axios.get(
        "https://5a5adfe6f3c47fd1.mokky.dev/days"
      );
      const userMeals = data.filter((meal) => meal.owner === currentUser.id);
      const dateMeals = userMeals.filter((meal) => meal.day === values.date);
      setCards(dateMeals);
    } catch (error) {
      console.log(error);
    }
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
  }, [cards]);

  useEffect(() => {
    getCards();
  }, [values]);

  return (
    <main className="main">
      <input
        type="date"
        name="date"
        id="date"
        onChange={handleChange}
        value={values.date}
        className="main__date"
      />
      <section className="main__graphics">
        <div className="main__graphics-circle">
          <h2>{ccalsPerDay - ccals >= 0 ? ccalsPerDay - ccals : 0}</h2>
          <span>осталось</span>
        </div>
      </section>
      <section className="main__add-graphics">
        <ul className="main__add-graphics-list">
          <li className="main__add-graphics-list-item">
            <span>Белки</span>
            <div></div>
            <span>
              {prot}/{protPerDay} г
            </span>
          </li>
          <li className="main__add-graphics-list-item">
            <span>Жиры</span>
            <div></div>
            <span>
              {fat}/{fatPerDay} г
            </span>
          </li>
          <li className="main__add-graphics-list-item">
            <span>Углеводы</span>
            <div></div>
            <span>
              {carbs}/{carbsPerDay} г
            </span>
          </li>
        </ul>
      </section>
      <Cards
        cards={cards}
        ccalsList={ccalsList}
        handlePopupClick={handlePopupClick}
        setSelectedMealId={setSelectedMealId}
        handleMealDelete={handleMealDelete}
      />
      <MainContext.Provider value={{ protPerDay, fatPerDay, carbsPerDay }}>
        <Popup
          handlePopupClick={handlePopupClick}
          isPopupVisible={isPopupVisible}
          selectedMealId={selectedMealId}
          cards={cards}
          setCards={setCards}
          ccalsList={ccalsList}
          ddmmyyyy={values.date}
          getCards={getCards}
          getCcalsList={getCcalsList}
          isSbmtDisabled={isSbmtDisabled}
          currentUser={currentUser}
        />
      </MainContext.Provider>
    </main>
  );
}

export default Main;
