import { useContext, useEffect, useState } from "react";
import MainContext from "../../utils/MainContext";
import "./AddMealForm.css";
import binImgPath from "../../images/x-white.png";

function AddMealForm({ selectedMealId, cards, ccalsList }) {
  const { CCALS_PER_DAY, PROT_PER_DAY, FAT_PER_DAY, CARBS_PER_DAY } =
    useContext(MainContext);

  const [mealProt, setMealProt] = useState(0);
  const [mealFat, setMealFat] = useState(0);
  const [mealCarbs, setMealCarbs] = useState(0);
  const [mealCcals, setMealCcals] = useState(0);

  const [products, setProducts] = useState([]);

  function calc(meal, prop) {
    if (meal && prop) {
      return meal.products
        .map((prod) => {
          const productInfo = ccalsList.find((item) => item.name === prod.text);
          return (productInfo[prop] * prod.grams) / 100;
        })
        .reduce((a, b) => a + b, 0);
    }
  }

  useEffect(() => {
    const meal = cards.find((card) => card.id === selectedMealId);
    if (meal) {
      setProducts(meal.products);
      if (ccalsList) {
        setMealCcals(Math.round(calc(meal, "ccals")));
        setMealProt(Math.round((calc(meal, "prot") * 100) / PROT_PER_DAY));
        setMealFat(Math.round((calc(meal, "fat") * 100) / FAT_PER_DAY));
        setMealCarbs(Math.round((calc(meal, "carbs") * 100) / CARBS_PER_DAY));
      }
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
        {products.map((product) => (
          <li key={product.id} className="meal-form__meals-item">
            <div id="img-block">
              <img
                id="product"
                src={product.imagePath}
                alt="Картинка продукта"
              />
              <div id="overlay">
                <img id="bin" src={binImgPath} alt="Иконка удаления продукта" />
              </div>
            </div>
            <p>{product.text}</p>
            <span>{product.grams} г</span>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default AddMealForm;
