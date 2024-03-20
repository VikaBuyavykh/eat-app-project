import { useEffect, useState, useContext } from "react";
import axios from "axios";
import MainContext from "../../utils/MainContext";
import "./Popup.css";
import "../AddMealForm/AddMealForm";
import AddMealForm from "../AddMealForm/AddMealForm";
import AddProductForm from "../AddProductForm/AddProductForm";
import arrowImgPath from "../../images/arrow.png";
import plusImgPath from "../../images/plus.png";
function Popup({
  handlePopupClick,
  isPopupVisible,
  selectedMealId,
  cards,
  setCards,
  ccalsList,
  dateId,
}) {
  const { PROT_PER_DAY, FAT_PER_DAY, CARBS_PER_DAY } = useContext(MainContext);

  const [products, setProducts] = useState([]);
  const [mealProt, setMealProt] = useState(0);
  const [mealFat, setMealFat] = useState(0);
  const [mealCarbs, setMealCarbs] = useState(0);
  const [mealCcals, setMealCcals] = useState(0);
  const [mealTitle, setMealTitle] = useState("");
  const [isFunctional, setIsFunctional] = useState(false);
  const [isAddingAProduct, setIsAddingAProduct] = useState(false);
  const [selectedProdId, setSelectedProdId] = useState(null);
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function handlePopupClose(e) {
    e.target === e.currentTarget && handlePopupClick();
  }

  function handleBackClick() {
    if (!isAddingAProduct) {
      handlePopupClick();
    } else {
      setIsAddingAProduct(false);
      setSelectedProdId(null);
    }
  }

  function handlePlusClick() {
    setIsAddingAProduct(true);
  }

  function handleAddClick() {
    isAddingAProduct && setIsAddingAProduct(false);
  }

  function handleDeleteClick(e) {
    const idToDelete = e.currentTarget.closest(".meal-form__meals-item").id;
    setProducts(
      products.filter((product) => product.id !== Number(idToDelete))
    );
  }

  function calc(meal, prop) {
    if (meal && prop) {
      return meal
        .map((prod) => {
          const productInfo = ccalsList.find((item) => item.name === prod.text);
          return (productInfo[prop] * prod.grams) / 100;
        })
        .reduce((a, b) => a + b, 0);
    }
  }

  function handleChooseClick(e) {
    const selectedElem = document.querySelector(
      ".product-form__form-list-item_active"
    );
    selectedElem &&
      selectedElem.classList.remove("product-form__form-list-item_active");
    e.currentTarget.classList.add("product-form__form-list-item_active");
    setSelectedProdId(e.currentTarget.id);
  }

  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  function filterById() {
    const prodsIds = products.map((prod) => prod.id);
    return ccalsList.filter((item) => !prodsIds.includes(item.id));
  }

  function filterByName() {
    setList(
      filterById().filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }

  async function handleMealFormSbmt(e) {
    e.preventDefault();
    const newCards = cards.map((card) =>
      card.id !== Number(selectedMealId)
        ? card
        : { ...card, products: products }
    );
    await axios.patch(`https://5a5adfe6f3c47fd1.mokky.dev/days/${dateId}`, {
      meals: newCards,
    });
    setCards(newCards);
  }

  useEffect(() => {
    filterByName();
  }, [searchQuery]);

  useEffect(() => {
    if (selectedProdId && !isAddingAProduct) {
      const elem = ccalsList.find((item) => item.id === Number(selectedProdId));
      setProducts([
        ...products,
        {
          grams: 100,
          id: elem.id,
          imagePath: elem.img,
          text: elem.name,
        },
      ]);
    }
    if (isAddingAProduct) {
      setList(filterById());
    }
  }, [isAddingAProduct]);

  useEffect(() => {
    if (!isPopupVisible) {
      setTimeout(() => {
        setProducts([]);
        setMealProt(0);
        setMealFat(0);
        setMealCarbs(0);
        setMealCcals(0);
        setMealTitle("");
        setIsFunctional(false);
        setIsAddingAProduct(false);
        setSelectedProdId(null);
      }, 500);
    } else {
      selectedMealId === undefined && setIsFunctional(true);
      const meal = cards.find((card) => card.id === selectedMealId);
      if (meal) {
        setMealTitle(meal.title);
        if (ccalsList) {
          setProducts(meal.products);
        }
      }
    }
  }, [isPopupVisible]);

  useEffect(() => {
    if (products.length > 0) {
      setMealCcals(Math.round(calc(products, "ccals")));
      setMealProt(Math.round((calc(products, "prot") * 100) / PROT_PER_DAY));
      setMealFat(Math.round((calc(products, "fat") * 100) / FAT_PER_DAY));
      setMealCarbs(Math.round((calc(products, "carbs") * 100) / CARBS_PER_DAY));
    }
  }, [products]);

  return (
    <>
      <div
        onClick={handlePopupClose}
        className={`popup ${isPopupVisible ? "popup_visible" : ""}`}
      >
        <div className="popup__box">
          <div className="popup__content">
            {!isAddingAProduct ? (
              <AddMealForm
                isFunctional={isFunctional}
                mealTitle={mealTitle}
                mealCcals={mealCcals}
                mealProt={mealProt}
                mealFat={mealFat}
                mealCarbs={mealCarbs}
                products={products}
                handleDeleteClick={handleDeleteClick}
                handleMealFormSbmt={handleMealFormSbmt}
              />
            ) : (
              <AddProductForm
                list={list}
                mealTitle={mealTitle}
                handleChooseClick={handleChooseClick}
                handleSearchQuery={handleSearchQuery}
              />
            )}
            <div className="popup__content-btn-group">
              <button
                onClick={handleBackClick}
                type="button"
                className="popup__content-btn-group_btn"
              >
                <img src={arrowImgPath} alt="Иконка стрелки назад" />
              </button>
              {isAddingAProduct && (
                <button
                  onClick={handleAddClick}
                  type="button"
                  className="popup__content-btn-group_sbmt"
                >
                  Добавить
                </button>
              )}
              {!isAddingAProduct && (
                <button
                  form="meal"
                  type="submit"
                  className="popup__content-btn-group_sbmt"
                >
                  Сохранить
                </button>
              )}
              <button
                onClick={handlePlusClick}
                type="button"
                className="popup__content-btn-group_btn"
              >
                <img src={plusImgPath} alt="Иконка добавления продукта" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;
