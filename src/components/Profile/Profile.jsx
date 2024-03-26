import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import useForm from "../../utils/UseForm";
import handleInput from "../../utils/handleInput";

function Profile({
  setCurrentPage,
  currentUser,
  setCurrentUser,
  setIsLoggedIn,
  isSbmtDisabled,
}) {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    name: currentUser.name,
    email: currentUser.email,
    weight: currentUser.weight,
    purpose: currentUser.purpose,
    ccals: currentUser.ccal,
  });

  const [sbmtDisability, setSbmtDisability] = useState(false);
  const [apiError, setApiError] = useState("");

  function handleFormInput(e) {
    setApiError("");
    setSbmtDisability(isSbmtDisabled(e));
  }

  async function handleFormSbmt(e) {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "https://5a5adfe6f3c47fd1.mokky.dev/users"
      );
      const usersEmails = data
        .map((user) => user.email)
        .filter((email) => email !== currentUser.email);
      if (usersEmails.includes(values.email)) {
        throw new Error("Пользователь с таким email существует");
      } else {
        const { data } = await axios.patch(
          `https://5a5adfe6f3c47fd1.mokky.dev/users/${currentUser.id}`,
          {
            name: values.name,
            email: values.email,
            weight: values.weight,
            purpose: values.purpose,
            ccal: values.ccals,
          }
        );
        setCurrentUser({
          ...currentUser,
          name: data.name,
          email: data.email,
          weight: data.weight,
          purpose: data.purpose,
          ccal: data.ccal,
        });
      }
    } catch (error) {
      setApiError(error.message);
      console.log(error);
    }
  }

  function logOut() {
    setCurrentUser({});
    setIsLoggedIn(false);
    navigate("/login");
    localStorage.clear();
  }

  useEffect(() => setCurrentPage("profile"), []);

  return (
    <form
      onSubmit={handleFormSbmt}
      onInput={handleFormInput}
      name="profile"
      className="profile"
      noValidate
    >
      <div className="profile__input-group">
        <label htmlFor="name">Имя</label>
        <input
          onInput={handleInput}
          onChange={handleChange}
          value={values.name}
          type="text"
          id="name"
          name="name"
          placeholder="Введи имя"
        />
      </div>
      <span id="error-name"></span>
      <div className="profile__input-group">
        <label htmlFor="email">Почта</label>
        <input
          onInput={handleInput}
          onChange={handleChange}
          value={values.email}
          type="email"
          id="email"
          name="email"
          placeholder="email@example.com"
        />
      </div>
      <span id="error-email"></span>
      <div className="profile__input-group">
        <label htmlFor="weight">Текущий вес</label>
        <input
          onInput={handleInput}
          onChange={handleChange}
          value={values.weight}
          type="number"
          id="weight"
          name="weight"
        />
      </div>
      <span id="error-weight"></span>
      <div className="profile__input-group">
        <label htmlFor="purpose">Цель</label>
        <input
          onInput={handleInput}
          onChange={handleChange}
          value={values.purpose}
          type="number"
          id="purpose"
          name="purpose"
        />
      </div>
      <span id="error-purpose"></span>
      <div className="profile__input-group">
        <label htmlFor="ccals">Комфортное количество калорий в день</label>
        <input
          onInput={handleInput}
          onChange={handleChange}
          value={values.ccals}
          type="number"
          id="ccals"
          name="ccals"
        />
      </div>
      <span id="error-ccals"></span>
      <button disabled={sbmtDisability} type="submit" className="profile__btn">
        Редактировать
      </button>
      <p id="error-api">{apiError}</p>
      <a onClick={logOut}>Выйти из аккаунта</a>
    </form>
  );
}

export default Profile;
