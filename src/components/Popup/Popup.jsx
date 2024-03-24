import { useEffect, useState, useContext } from "react";
import axios from "axios";
import MainContext from "../../utils/MainContext";
import "./Popup.css";
import "../AddMealForm/AddMealForm";
import AddMealForm from "../AddMealForm/AddMealForm";
import AddProductForm from "../AddProductForm/AddProductForm";
import CreateProductForm from "../CreateProductForm/CreateProductForm";
import UseForm from "../../utils/UseForm";
import arrowImgPath from "../../images/arrow.png";
import plusImgPath from "../../images/plus.png";

function Popup({
  handlePopupClick,
  isPopupVisible,
  selectedMealId,
  cards,
  setCards,
  ccalsList,
  ddmmyyyy,
  getCards,
  getCcalsList,
  isSbmtDisabled,
}) {
  const { PROT_PER_DAY, FAT_PER_DAY, CARBS_PER_DAY } = useContext(MainContext);
  const { values, handleChange, setValues } = UseForm({
    text: "",
    ccals: "",
    prot: "",
    fat: "",
    carbs: "",
    url: "",
  });

  const [products, setProducts] = useState([]);
  const [mealProt, setMealProt] = useState(0);
  const [mealFat, setMealFat] = useState(0);
  const [mealCarbs, setMealCarbs] = useState(0);
  const [mealCcals, setMealCcals] = useState(0);
  const [mealTitle, setMealTitle] = useState("");
  const [isFunctional, setIsFunctional] = useState(false);
  const [isAddingAProduct, setIsAddingAProduct] = useState(false);
  const [isCreatingAProduct, setIsCreatingAProduct] = useState(false);
  const [selectedProdId, setSelectedProdId] = useState(null);
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [select, setSelect] = useState("breakfast");
  const [isSbmtBtnDisabled, setIsSbmtBtnDisabled] = useState(true);
  const [isSbmtCreationDisabled, setIsSbmtCreationDisabled] = useState(true);
  const [isAddBtnDisabled, setIsAddBtnDisabled] = useState(true);

  function handlePopupClose(e) {
    e.target === e.currentTarget && handlePopupClick();
  }

  function handleBackClick() {
    if (!isAddingAProduct && !isCreatingAProduct) {
      handlePopupClick();
    } else if (isCreatingAProduct) {
      setIsCreatingAProduct(false);
      setIsAddingAProduct(true);
    } else {
      setIsAddingAProduct(false);
    }
    setSelectedProdId(null);
  }

  function handlePlusClick() {
    if (!isAddingAProduct) {
      setIsAddingAProduct(true);
    } else {
      setIsAddingAProduct(false);
      setIsCreatingAProduct(true);
    }
  }

  function handleAddClick() {
    isAddingAProduct && setIsAddingAProduct(false);
  }

  function handleProductDelete(e) {
    const idToDelete = e.currentTarget.closest(".product").id;
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

  function handleSelect(e) {
    setSelect(e.target.value);
  }

  function onCreationFormInput(e) {
    setIsSbmtCreationDisabled(isSbmtDisabled(e));
  }

  async function handleFormSbmt(e) {
    e.preventDefault();
    try {
      if (!isCreatingAProduct) {
        if (isFunctional) {
          await axios.post(`https://5a5adfe6f3c47fd1.mokky.dev/days`, {
            day: ddmmyyyy,
            title:
              select === "breakfast"
                ? "Завтрак"
                : select === "lunch"
                ? "Обед"
                : select === "dinner"
                ? "Ужин"
                : "Перекус",
            products: products,
          });
          getCards();
        } else {
          await axios.patch(
            `https://5a5adfe6f3c47fd1.mokky.dev/days/${selectedMealId}`,
            { products: products }
          );
          setCards(
            cards.map((card) =>
              card.id !== Number(selectedMealId)
                ? card
                : { ...card, products: products }
            )
          );
        }
        handlePopupClick();
      } else {
        await axios.post("https://5a5adfe6f3c47fd1.mokky.dev/products", {
          name: values.text,
          ccals: values.ccals,
          prot: values.prot,
          fat: values.fat,
          carbs: values.carbs,
          img: values.url,
        });
        getCcalsList();
        handleBackClick();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    filterByName();
  }, [searchQuery]);

  useEffect(() => {
    setList(filterById());
  }, [ccalsList]);

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
        setIsCreatingAProduct(false);
        setSelectedProdId(null);
        setSelect("breakfast");
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
    setMealCcals(Math.round(calc(products, "ccals")));
    setMealProt(Math.round((calc(products, "prot") * 100) / PROT_PER_DAY));
    setMealFat(Math.round((calc(products, "fat") * 100) / FAT_PER_DAY));
    setMealCarbs(Math.round((calc(products, "carbs") * 100) / CARBS_PER_DAY));
    if (products.length > 0) {
      setIsSbmtBtnDisabled(false);
    } else {
      setIsSbmtBtnDisabled(true);
    }
  }, [products]);

  useEffect(() => {
    selectedProdId ? setIsAddBtnDisabled(false) : setIsAddBtnDisabled(true);
  }, [selectedProdId]);

  useEffect(() => {
    if (!isCreatingAProduct) {
      setValues({
        text: "",
        ccals: "",
        prot: "",
        fat: "",
        carbs: "",
        url: "",
      });
      setIsSbmtCreationDisabled(true);
    }
  }, [isCreatingAProduct]);

  return (
    <>
      <div
        onClick={handlePopupClose}
        className={`popup ${isPopupVisible ? "popup_visible" : ""}`}
      >
        <div className="popup__box">
          <div className="popup__content">
            {!isAddingAProduct && !isCreatingAProduct ? (
              <AddMealForm
                isFunctional={isFunctional}
                mealTitle={mealTitle}
                mealCcals={mealCcals}
                mealProt={mealProt}
                mealFat={mealFat}
                mealCarbs={mealCarbs}
                products={products}
                setProducts={setProducts}
                handleProductDelete={handleProductDelete}
                handleFormSbmt={handleFormSbmt}
                handleSelect={handleSelect}
                select={select}
              />
            ) : isAddingAProduct ? (
              <AddProductForm
                list={list}
                mealTitle={mealTitle}
                handleChooseClick={handleChooseClick}
                handleSearchQuery={handleSearchQuery}
              />
            ) : (
              <CreateProductForm
                values={values}
                handleChange={handleChange}
                handleFormSbmt={handleFormSbmt}
                onCreationFormInput={onCreationFormInput}
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
                  disabled={isAddBtnDisabled}
                >
                  Добавить
                </button>
              )}
              {!isAddingAProduct && (
                <button
                  form={!isCreatingAProduct ? "meal" : "creation"}
                  type="submit"
                  className="popup__content-btn-group_sbmt"
                  disabled={
                    !isCreatingAProduct
                      ? isSbmtBtnDisabled
                      : isSbmtCreationDisabled
                  }
                >
                  Сохранить
                </button>
              )}
              {!isCreatingAProduct && (
                <button
                  onClick={handlePlusClick}
                  type="button"
                  className="popup__content-btn-group_btn"
                >
                  <img src={plusImgPath} alt="Иконка добавления продукта" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;
