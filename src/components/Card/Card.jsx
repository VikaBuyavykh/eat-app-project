import "./Card.css";
import binImgPath from "../../images/bin-white.png";
import plusImgPath from "../../images/plus-white.png";

function Card({
  id,
  imgPath,
  title,
  text,
  grams,
  isFunctionalCard,
  handlePopupClick,
  setSelectedMealId,
  ccalsList,
}) {
  function handleCardClick() {
    handlePopupClick();
    setSelectedMealId(id);
  }

  return (
    <li onClick={handleCardClick} className="card">
      <h3
        className={`card__title ${isFunctionalCard ? "card__title_func" : ""}`}
      >
        {!isFunctionalCard ? title : "Новая запись"}
      </h3>
      <div className="card__content">
        <img
          className={`card__content-img ${
            isFunctionalCard ? "card__content-img_func" : ""
          }`}
          src={!isFunctionalCard ? imgPath : plusImgPath}
          alt="Картинка блюда"
        />
        {!isFunctionalCard ? (
          <>
            <p className="card__content-text">{text}</p>
            <div className="card__content-btn-section">
              <b>
                {ccalsList.length > 0 && text
                  ? Math.round(
                      (ccalsList.find((prod) => prod.name === text).ccals *
                        grams) /
                        100
                    ) + " ккал"
                  : ""}
              </b>
              <button type="button">
                <img id="button" src={binImgPath} alt="Иконка удаления" />
              </button>
            </div>
          </>
        ) : (
          <p className="card__content-text_func">Добавить</p>
        )}
      </div>
      <div
        className={`card__bg ${isFunctionalCard ? "card__bg_func" : ""}`}
      ></div>
    </li>
  );
}

export default Card;
