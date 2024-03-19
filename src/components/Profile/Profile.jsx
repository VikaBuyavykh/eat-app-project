import { useEffect } from "react";
import "./Profile.css";

function Profile({ setCurrentPage }) {
  useEffect(() => setCurrentPage("profile"), []);

  return (
    <form name="profile" className="profile">
      <div className="profile__input-group">
        <label htmlFor="name">Имя</label>
        <input type="text" id="name" name="name" value="Вика" />
      </div>
      <div className="profile__input-group">
        <label htmlFor="email">Почта</label>
        <input type="email" id="email" name="email" value="vika@example.com" />
      </div>
      <div className="profile__input-group">
        <label htmlFor="weight">Ваш текущий вес</label>
        <input type="number" id="weight" name="weight" value={53} />
      </div>
      <div className="profile__input-group">
        <label htmlFor="purpose">Цель</label>
        <input type="number" id="purpose" name="purpose" value={7} />
      </div>
      <div className="profile__input-group">
        <label htmlFor="ccals">Комфортное количество калорий в день</label>
        <input type="number" id="ccals" name="ccals" value={1100} />
      </div>
      <button type="button" className="profile__btn">
        Edit
      </button>
    </form>
  );
}

export default Profile;
