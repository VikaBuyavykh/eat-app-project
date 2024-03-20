import { useEffect, useState, useContext } from "react";
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
  ccalsList,
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
      return meal.products
        .map((prod) => {
          const productInfo = ccalsList.find((item) => item.name === prod.text);
          return (productInfo[prop] * prod.grams) / 100;
        })
        .reduce((a, b) => a + b, 0);
    }
  }

  function handleChooseClick(e) {
    Array.from(
      document.querySelectorAll(".product-form__form-list-item_active")
    ).forEach((item) =>
      item.classList.remove("product-form__form-list-item_active")
    );
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
        setProducts(meal.products);
        if (ccalsList) {
          setProducts(
            meal.products.map((prod) => {
              const elemId = ccalsList.find(
                (item) => item.name === prod.text
              ).id;
              return { ...prod, id: elemId };
            })
          );
          setMealCcals(Math.round(calc(meal, "ccals")));
          setMealProt(Math.round((calc(meal, "prot") * 100) / PROT_PER_DAY));
          setMealFat(Math.round((calc(meal, "fat") * 100) / FAT_PER_DAY));
          setMealCarbs(Math.round((calc(meal, "carbs") * 100) / CARBS_PER_DAY));
        }
      }
    }
  }, [isPopupVisible]);

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
              <button onClick={handleBackClick} type="button">
                <img src={arrowImgPath} alt="Иконка стрелки назад" />
              </button>
              <button onClick={handleAddClick} type="submit">
                {isAddingAProduct ? "Добавить" : "Сохранить"}
              </button>
              <button onClick={handlePlusClick} type="button">
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
