//import "./Card.css";
import binImgPath from "../../images/bin-white.png";

function Card({ imgPath, title, text, ccals }) {
  return (
    <li>
      <h3>{title}</h3>
      <div>
        <img id="img" src={imgPath} alt="Картинка блюда" />
        <p>{text}</p>
        <div>
          <b>{ccals}</b>
          <button type="button">
            <img id="button" src={binImgPath} alt="Иконка удаления" />
          </button>
        </div>
      </div>
      <div id="bg"></div>
    </li>
  );
}

export default Card;
