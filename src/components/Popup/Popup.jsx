import "./Popup.css";
import "../AddMealForm/AddMealForm";
import AddMealForm from "../AddMealForm/AddMealForm";
import arrowImgPath from "../../images/arrow.png";

function Popup({ handlePopupClick, isPopupVisible, selectedMealId, cards }) {
  function handlePopupClose(e) {
    e.target === e.currentTarget && handlePopupClick();
  }

  return (
    <>
      <div
        onClick={handlePopupClose}
        className={`popup ${isPopupVisible ? "popup_visible" : ""}`}
      >
        <div className="popup__box">
          <div className="popup__content">
            <AddMealForm selectedMealId={selectedMealId} cards={cards} />
            <div className="popup__content-btn-group">
              <button onClick={handlePopupClick} type="button">
                <img src={arrowImgPath} alt="Иконка стрелки назад" />
              </button>
              <button type="submit">Добавить</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;
