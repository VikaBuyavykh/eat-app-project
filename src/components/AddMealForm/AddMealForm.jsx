import "./AddMealForm.css";
import Product from "../Product/Product";

function AddMealForm({
  isFunctional,
  mealTitle,
  mealCcals,
  mealProt,
  mealFat,
  mealCarbs,
  products,
  setProducts,
  handleProductDelete,
  handleFormSbmt,
  handleSelect,
  select,
}) {
  return (
    <form name="meal" id="meal" onSubmit={handleFormSbmt} className="meal-form">
      {isFunctional ? (
        <select
          name="title"
          id="title"
          className="meal-form__title meal-form__title_select"
          onChange={handleSelect}
          value={select}
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
      {products.length > 0 ? (
        <ul className="meal-form__meals">
          {products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              imagePath={product.imagePath}
              grams={product.grams}
              handleProductDelete={handleProductDelete}
              text={product.text}
              products={products}
              setProducts={setProducts}
            />
          ))}
        </ul>
      ) : (
        <p className="meal-form__text">Добавьте продукты</p>
      )}
    </form>
  );
}

export default AddMealForm;
