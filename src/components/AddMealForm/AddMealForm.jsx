import { useEffect, useState } from "react";
import "./AddMealForm.css";
import binImgPath from "../../images/x-white.png";

function AddMealForm({ selectedMealId, cards }) {
  const [mealImg, setMealImg] = useState("");
  const [mealText, setMealText] = useState("");
  const [mealGrams, setMealGrams] = useState(null);

  useEffect(() => {
    const meal = cards.find((card) => card.id === selectedMealId);
    if (meal) {
      setMealImg(meal.imagePath);
      setMealText(meal.text);
      setMealGrams(meal.grams);
    }
  }, [selectedMealId]);

  return (
    <form name="meal-form" className="meal-form">
      <h3 className="meal-form__title">Завтрак</h3>
      <ul className="meal-form__graphics">
        <li className="meal-form__graphics-item">
          <div className="meal-form__graphics-item-circle">
            <p>0</p>
          </div>
          <span>Калории</span>
        </li>
        <li className="meal-form__graphics-item">
          <div className="meal-form__graphics-item-circle">
            <p>0</p>
          </div>
          <span>Белки</span>
        </li>
        <li className="meal-form__graphics-item">
          <div className="meal-form__graphics-item-circle">
            <p>0</p>
          </div>
          <span>Жиры</span>
        </li>
        <li className="meal-form__graphics-item">
          <div className="meal-form__graphics-item-circle">
            <p>0</p>
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
