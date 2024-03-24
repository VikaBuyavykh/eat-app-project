import {
  nameRegex,
  urlRegex,
  numberRegex,
  userNameRegex,
  emailRegex,
} from "./regex";

export default function handleInput(e) {
  function isLinkValid(value) {
    return urlRegex.test(value);
  }
  function isNameValid(value) {
    return nameRegex.test(value);
  }
  function isNumberValid(value) {
    return numberRegex.test(value);
  }
  function isUserNameValid(value) {
    return userNameRegex.test(value);
  }
  function isEmailValid(value) {
    return emailRegex.test(value);
  }
  const element = e.target;
  const errorElement = document.querySelector(`#error-${element.id}`);
  errorElement.textContent = "";
  if (element.id === "url") {
    if (!isLinkValid(element.value)) {
      errorElement.textContent = "Переданная ссылка некорректна";
    }
  } else if (element.id === "text") {
    if (!isNameValid(element.value)) {
      errorElement.textContent =
        "Напиши название кириллицей, возможны пробелы, дефис, числа и %";
    }
  } else if (element.type === "number") {
    if (!isNumberValid(element.value)) {
      errorElement.textContent =
        "Число может быть целым (четырехзначным - максимально) или дробным до одного знака после запятой";
    }
  } else if (element.id === "name") {
    if (!isUserNameValid(element.value)) {
      errorElement.textContent =
        "Имя напиши кириллицей, можно использовать пробелы и дефис";
    }
  } else if (element.id === "email") {
    if (!isEmailValid(element.value)) {
      errorElement.textContent = "Формат почты некорректен";
    }
  } else {
    if (!element.checkValidity()) {
      errorElement.textContent = element.validationMessage;
    }
  }
}
