import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import avocsdosImg from "../../images/avocado-friends.png";
import likeImg from "../../images/like.png";
import avocadoCool from "../../images/avocado-cool.png";
import avocadoLove from "../../images/avocado-loving.png";
import useForm from "../../utils/UseForm";
import handleInput from "../../utils/handleInput";

export default function Register({
  isSbmtDisabled,
  currentUser,
  setCurrentUser,
  setIsLoggedIn,
}) {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
    weight: "",
    purpose: "",
    ccal: "",
  });

  const [sbmtDisability, setSbmtDisability] = useState(true);
  const [apiError, setApiError] = useState("");
  const [isInfo, setIsInfo] = useState(false);
  const [isAddInfo, setIsAddInfo] = useState(false);

  function onGoClick() {
    setIsInfo(true);
  }

  function handleFormInput(e) {
    setApiError("");
    setSbmtDisability(isSbmtDisabled(e));
  }

  async function handleFormSbmt(e) {
    e.preventDefault();
    try {
      if (isInfo) {
        const { data } = await axios.get(
          "https://5a5adfe6f3c47fd1.mokky.dev/users"
        );
        const user = data.find((user) => user.email === values.email);
        if (user) {
          throw new Error("Пользователь с таким email существует");
        } else {
          const { data } = await axios.post(
            "https://5a5adfe6f3c47fd1.mokky.dev/register",
            {
              name: values.name,
              email: values.email,
              password: values.password,
            }
          );
          setCurrentUser({
            name: data.data.name,
            email: data.data.email,
            id: data.data.id,
            token: data.token,
          });
          setIsInfo(false);
          setIsAddInfo(true);
          setSbmtDisability(true);
        }
      } else {
        await axios.patch(
          `https://5a5adfe6f3c47fd1.mokky.dev/users/${currentUser.id}`,
          {
            weight: values.weight,
            purpose: values.purpose,
            ccal: values.ccal,
          }
        );
        setIsAddInfo(false);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      setApiError(error.message);
    }
  }

  return (
    <main className="register">
      <div className="register__img-group">
        {!isInfo && !isAddInfo && (
          <img
            className="register__img-group_like"
            src={likeImg}
            alt="Картинка сердца"
          />
        )}
        <img
          className="register__img-group_img"
          src={
            !isInfo && !isAddInfo
              ? avocsdosImg
              : isInfo
              ? avocadoCool
              : avocadoLove
          }
          alt="Картинка авокадо"
        />
      </div>
      {!isInfo && !isAddInfo ? (
        <div className="register__text-block">
          <h1>Привет, Друг!</h1>
          <b>Приготовься стать лучшей версией себя.</b>
          <p>
            Это дневник, который поможет тебе контролитовать свое питание,
            следить за пропорцией КБЖУ и отмечать свой прогресс. Давай
            познакомимся поближе?
          </p>
          <button
            onClick={onGoClick}
            type="button"
            className="register__button"
          >
            Давай
          </button>
          <p id="link">
            Уже зарегистрирован? <a href="/login">Войти</a>
          </p>
        </div>
      ) : isInfo ? (
        <form
          onSubmit={handleFormSbmt}
          onInput={handleFormInput}
          className="register__form"
        >
          <div className="register__form-item">
            <label htmlFor="name">Как тебя зовут?</label>
            <input
              onChange={handleChange}
              onInput={handleInput}
              value={values.name}
              type="text"
              name="name"
              id="name"
              placeholder="Твое имя"
              required
            />
            <span id="error-name"></span>
          </div>
          <div className="register__form-item">
            <label htmlFor="email">Какую почту используешь?</label>
            <input
              onChange={handleChange}
              onInput={handleInput}
              value={values.email}
              type="email"
              name="email"
              id="email"
              placeholder="your-email@examle.com"
              required
            />
            <span id="error-email"></span>
          </div>
          <div className="register__form-item">
            <label htmlFor="password">Придумай пароль к аккаунту</label>
            <input
              onChange={handleChange}
              onInput={handleInput}
              value={values.password}
              type="password"
              name="password"
              id="password"
              placeholder="Тут пароль"
              minLength={8}
              required
            />
            <span id="error-password"></span>
          </div>
          <button
            disabled={sbmtDisability}
            type="submit"
            className="register__button"
          >
            Вперед
          </button>
          <p id="error-api">{apiError}</p>
        </form>
      ) : (
        <form
          className="register__form"
          onSubmit={handleFormSbmt}
          onInput={handleFormInput}
        >
          <div className="register__form-item">
            <label htmlFor="weight">Укажи свой текущий вес (в кг)</label>
            <input
              onChange={handleChange}
              onInput={handleInput}
              value={values.weight}
              type="number"
              name="weight"
              id="weight"
              required
            />
            <span id="error-weight"></span>
          </div>
          <div className="register__form-item">
            <label htmlFor="purpose">Сколько кг планируешь сбросить?</label>
            <input
              onChange={handleChange}
              onInput={handleInput}
              value={values.purpose}
              type="number"
              name="purpose"
              id="purpose"
              required
            />
            <span id="error-purpose"></span>
          </div>
          <div className="register__form-item">
            <label htmlFor="ccal">
              Сколько калорий в день будет комфортно?
            </label>
            <input
              onChange={handleChange}
              onInput={handleInput}
              value={values.ccal}
              type="number"
              name="ccal"
              id="ccal"
              required
            />
            <span id="error-ccal"></span>
          </div>
          <button
            disabled={sbmtDisability}
            type="submit"
            className="register__button"
          >
            Начинаем
          </button>
          <p id="error-api">{apiError}</p>
        </form>
      )}
    </main>
  );
}
