import "./AddProductForm.css";
import loupeImgPath from "../../images/loupe.png";

function AddProductForm({ handleChooseClick, mealTitle, list }) {
  return (
    <>
      <div className="product-form">
        <h2 className="product-form__title">{mealTitle}</h2>
        <form name="productForm" className="product-form__form">
          <div className="product-form__form-search">
            <img src={loupeImgPath} alt="Иконка лупы" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Поиск по продуктам"
            />
          </div>
          <ul className="product-form__form-list">
            {list.map((prod) => (
              <li
                onClick={handleChooseClick}
                key={prod.id}
                id={prod.id}
                className="product-form__form-list-item"
              >
                <div>
                  <p>{prod.name}</p>
                  <p>{prod.ccals} ккал</p>
                </div>
                <img src={prod.img} alt={prod.name} />
              </li>
            ))}
          </ul>
        </form>
      </div>
    </>
  );
}

export default AddProductForm;
