import { useState } from "react";
import "./Product.css";
import binImgPath from "../../images/x-white.png";

export default function Product({
  id,
  imagePath,
  text,
  grams,
  handleProductDelete,
  products,
  setProducts,
}) {
  const [numberInput, setNumberInput] = useState(grams);

  function handleNumberInput(e) {
    setNumberInput(e.target.value);
    const idToChange = e.currentTarget.closest(".product").id;
    setProducts(
      products.map((prod) =>
        prod.id !== Number(idToChange)
          ? prod
          : { ...prod, grams: e.target.value }
      )
    );
  }

  return (
    <li id={id} className="product">
      <div className="product__img-block" id="img">
        <img
          id="product"
          src={imagePath}
          alt="Картинка продукта"
          className="product__img-block_img"
        />
        <div
          id="overlay"
          onClick={handleProductDelete}
          className="product__img-block_overlay"
        >
          <img src={binImgPath} alt="Иконка удаления продукта" />
        </div>
      </div>
      <p className="product__text">{text}</p>
      <div className="product__input-block">
        <input onChange={handleNumberInput} type="number" value={numberInput} />
        <span> г</span>
      </div>
    </li>
  );
}
