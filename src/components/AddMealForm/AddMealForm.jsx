import { useContext, useEffect, useState } from "react";
import MainContext from "../../utils/MainContext";
import "./AddMealForm.css";
import binImgPath from "../../images/x-white.png";

function AddMealForm({ selectedMealId, cards, ccalsList }) {
  const { CCALS_PER_DAY, PROT_PER_DAY, FAT_PER_DAY, CARBS_PER_DAY } =
    useContext(MainContext);

  const [mealImg, setMealImg] = useState("");
  const [mealText, setMealText] = useState("");
  const [mealGrams, setMealGrams] = useState(null);
  const [mealProt, setMealProt] = useState(0);
  const [mealFat, setMealFat] = useState(0);
  const [mealCarbs, setMealCarbs] = useState(0);
  const [mealCcals, setMealCcals] = useState(0);

  useEffect(() => {
    const meal = cards.find((card) => card.id === selectedMealId);
    if (meal) {
      setMealImg(meal.imagePath);
      setMealText(meal.text);
      setMealGrams(meal.grams);
    }
    if (meal && ccalsList) {
      const mealInfo = ccalsList.find((prod) => prod.name === meal.text);
      setMealProt(Math.round((mealInfo.prot * meal.grams) / PROT_PER_DAY));
      setMealFat(Math.round((mealInfo.fat * meal.grams) / FAT_PER_DAY));
      setMealCarbs(Math.round((mealInfo.carbs * meal.grams) / CARBS_PER_DAY));
      setMealCcals(Math.round((mealInfo.ccals * meal.grams) / 100));
    }
  }, [selectedMealId]);

  return (
    <form name="meal-form" className="meal-form">
      <h3 className="meal-form__title">Завтрак</h3>
      <ul className="meal-form__graphics">
        <li className="meal-form__graphics-item">
          <div className="meal-form__graphics-item-circle">
            <p>{mealCcals}</p>
          </div>
          <span>Калории</span>
        </li>
        <li className="meal-form__graphics-item">
          <div className="meal-form__graphics-item-circle">
            <p>{mealProt > 100 ? "100" : mealProt} %</p>
          </div>
          <span>Белки</span>
        </li>
        <li className="meal-form__graphics-item">
          <div className="meal-form__graphics-item-circle">
            <p>{mealFat > 100 ? "100" : mealFat} %</p>
          </div>
          <span>Жиры</span>
        </li>
        <li className="meal-form__graphics-item">
          <div className="meal-form__graphics-item-circle">
            <p>{mealCarbs > 100 ? "100" : mealCarbs} %</p>
          </div>
          <span>Углеводы</span>
        </li>
      </ul>
      <ul className="meal-form__meals">
        <li className="meal-form__meals-item">
          <div id="img-block">
            <img id="product" src={mealImg} alt="Картинка продукта" />
            <div id="overlay">
              <img id="bin" src={binImgPath} alt="Иконка удаления продукта" />
            </div>
          </div>
          <p>{mealText}</p>
          <span>{mealGrams} г</span>
        </li>
      </ul>
    </form>
  );
}

export default AddMealForm;
