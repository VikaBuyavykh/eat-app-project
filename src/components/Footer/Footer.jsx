import { NavLink } from "react-router-dom";
import "./Footer.css";
import diaryActiveImgPath from "../../images/diary.png";
import progressActiveImgPath from "../../images/progress.png";
import profileActiveImgPath from "../../images/profile.png";

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer__menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `footer__menu_item ${isActive ? "footer__menu_item_active" : ""}`
          }
        >
          <img src={diaryActiveImgPath} alt="Иконка дневника" />
          <span>Дневник</span>
        </NavLink>
        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `footer__menu_item ${isActive ? "footer__menu_item_active" : ""}`
          }
        >
          <img src={progressActiveImgPath} alt="Иконка прогресса" />
          <span>Прогресс</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `footer__menu_item ${isActive ? "footer__menu_item_active" : ""}`
          }
        >
          <img src={profileActiveImgPath} alt="Иконка профиля" />
          <span>Профиль</span>
        </NavLink>
      </nav>
    </footer>
  );
}

export default Footer;
