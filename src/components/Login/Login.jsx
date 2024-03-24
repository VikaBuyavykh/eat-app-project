import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import avocsdosImg from "../../images/avocado-friends.png";
import likeImg from "../../images/like.png";
import useForm from "../../utils/UseForm";
import handleInput from "../../utils/handleInput";

export default function Login({
  isSbmtDisabled,
  setCurrentUser,
  setIsLoggedIn,
}) {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({ email: "", password: "" });

  const [apiError, setApiError] = useState("");
  const [sbmtDisability, setSbmtDisability] = useState(true);

  function handleFormInput(e) {
    setApiError("");
    setSbmtDisability(isSbmtDisabled(e));
  }

  async function handleFormSbmt(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://5a5adfe6f3c47fd1.mokky.dev/auth",
        {
          email: values.email,
          password: values.password,
        }
      );
      setCurrentUser({
        name: data.data.name,
        email: data.data.email,
        id: data.data.id,
        token: data.token,
        weight: data.data.weight,
        purpose: data.data.purpose,
        ccal: data.data.ccal,
      });
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        setApiError("Неправильные почта или пароль");
      } else {
        setApiError(error.message);
      }
    }
  }

  return (
    <main className="login">
      <div className="login__img-group">
        <img
          className="login__img-group_like"
          src={likeImg}
          alt="Картинка сердца"
        />
        <img
          className="login__img-group_img"
          src={avocsdosImg}
          alt="Картинка авокадо"
        />
      </div>
      <form
        onSubmit={handleFormSbmt}
        onInput={handleFormInput}
        className="login__form"
      >
        <h1>Приветы!</h1>
        <div className="login__form-item">
          <label htmlFor="email">Чтобы войти, нужно ввести почту</label>
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
        <div className="login__form-item">
          <label htmlFor="password">И пароль</label>
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
          className="login__button"
        >
          Вперед
        </button>
        <p id="error-api">{apiError}</p>
      </form>
      <p id="link">
        Еще не зарегистрирован? <a href="/register">Регистрация</a>
      </p>
    </main>
  );
}
