import { useContext, useEffect, useState } from "react";
import MainContext from "../../utils/MainContext";
import "./AddMealForm.css";
import binImgPath from "../../images/x-white.png";

function AddMealForm({ selectedMealId, cards, ccalsList, isPopupVisible }) {
  const { CCALS_PER_DAY, PROT_PER_DAY, FAT_PER_DAY, CARBS_PER_DAY } =
    useContext(MainContext);

  const [products, setProducts] = useState([]);
  const [mealProt, setMealProt] = useState(0);
  const [mealFat, setMealFat] = useState(0);
  const [mealCarbs, setMealCarbs] = useState(0);
  const [mealCcals, setMealCcals] = useState(0);

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

  function handleSelectChange(e) {
    Array.from(e.target.options).forEach((option) =>
      option.value === e.target.value
        ? option.setAttribute("selected", "selected")
        : option.removeAttribute("selected")
    );
    console.log(e.target);
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
      const g = Array.from(document.mealForm.title.options);
      isPopupVisible
        ? g
            .find((item) => item.text === meal.title)
            .setAttribute("selected", "selected")
        : g.forEach((item) => item.removeAttribute("selected"));
      console.log(document.mealForm.title);
    }
    if (!isPopupVisible) {
      setProducts([]);
      setMealProt(0);
      setMealFat(0);
      setMealCarbs(0);
      setMealCcals(0);
    }
  }, [isPopupVisible]);

  return (
    <form name="mealForm" className="meal-form">
      <select
        name="title"
        id="title"
        className="meal-form__title"
        onChange={handleSelectChange}
      >
        <option value="breakfast">Завтрак</option>
        <option value="lunch">Обед</option>
        <option value="dinner">Ужин</option>
        <option value="snack">Перекус</option>
      </select>
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
