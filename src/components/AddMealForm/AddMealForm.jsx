import "./AddMealForm.css";
import binImgPath from "../../images/x-white.png";

function AddMealForm({
  isFunctional,
  mealTitle,
  mealCcals,
  mealProt,
  mealFat,
  mealCarbs,
  products,
  handleDeleteClick,
}) {
  return (
    <form name="mealForm" className="meal-form">
      {isFunctional ? (
        <select
          name="title"
          id="title"
          className="meal-form__title meal-form__title_select"
        >
          <option value="breakfast">Завтрак</option>
          <option value="lunch">Обед</option>
          <option value="dinner">Ужин</option>
          <option value="snack">Перекус</option>
        </select>
      ) : (
        <h3 className="meal-form__title">{mealTitle}</h3>
      )}
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
          <li
            key={product.id}
            id={product.id}
            className="meal-form__meals-item"
          >
            <div id="img-block">
              <img
                id="product"
                src={product.imagePath}
                alt="Картинка продукта"
              />
              <div onClick={handleDeleteClick} id="overlay">
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
