import "./Card.css";
import binImgPath from "../../images/bin-white.png";

function Card({ imgPath, title, text, ccals }) {
  return (
    <li className="card">
      <h3 className="card__title">{title}</h3>
      <div className="card__content">
        <img
          className="card__content-card"
          src={imgPath}
          alt="Картинка блюда"
        />
        <p className="card__content-text">{text}</p>
        <div className="card__content-btn-section">
          <b>{ccals}</b>
          <button type="button">
            <img id="button" src={binImgPath} alt="Иконка удаления" />
          </button>
        </div>
      </div>
      <div className="card__bg"></div>
    </li>
  );
}

export default Card;
