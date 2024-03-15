import "./Footer.css";
import diaryActiveImgPath from "../../images/diary-active.png";
import progressActiveImgPath from "../../images/progress-active.png";
import profileActiveImgPath from "../../images/profile-active.png";

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer__menu">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__menu_item"
        >
          <img src={diaryActiveImgPath} alt="Иконка дневника" />
          <span>Дневник</span>
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__menu_item"
        >
          <img src={progressActiveImgPath} alt="Иконка прогресса" />
          <span>Прогресс</span>
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__menu_item"
        >
          <img src={profileActiveImgPath} alt="Иконка профиля" />
          <span>Профиль</span>
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
