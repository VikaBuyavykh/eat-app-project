import { nameRegex, urlRegex, numberRegex } from "./regex";

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
        "Напишите название кириллицей, возможны пробелы, дефис, числа и %";
    }
  } else if (element.id === "number") {
    if (!isNumberValid(element.value)) {
      errorElement.textContent =
        "Число может быть целым (четырехзначным - максимально) или дробным до одного знака после запятой";
    }
  } else {
    if (!element.checkValidity()) {
      errorElement.textContent = element.validationMessage;
    }
  }
}
