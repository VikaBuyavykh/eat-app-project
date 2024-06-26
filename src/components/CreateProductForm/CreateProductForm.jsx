import "./CreateProductForm.css";
import handleInput from "../../utils/handleInput";

export default function CreateProductForm({
  values,
  handleChange,
  handleFormSbmt,
  onCreationFormInput,
}) {
  return (
    <form
      onSubmit={handleFormSbmt}
      onInput={onCreationFormInput}
      name="creation"
      id="creation"
      className="creation"
      noValidate
    >
      <div className="creation__input-group">
        <label htmlFor="text">Название продукта/блюда</label>
        <input
          onChange={handleChange}
          onInput={handleInput}
          value={values.text}
          type="text"
          name="text"
          id="text"
          placeholder="Введите название"
          pattern="\w{3,16}"
          required
        />
        <span id="error-text"></span>
      </div>
      <div className="creation__inputs-group">
        <p className="creation__inputs-group-text">Нутриенты (на 100 г)</p>
        <div className="creation__inputs-group-container">
          <div className="creation__inputs-group-container-item">
            <label htmlFor="ccals">Калории</label>
            <input
              onChange={handleChange}
              onInput={handleInput}
              value={values.ccals}
              type="number"
              name="ccals"
              id="number"
              required
            />
          </div>
          <div className="creation__inputs-group-container-item">
            <label htmlFor="prot">Белки</label>
            <input
              onChange={handleChange}
              onInput={handleInput}
              value={values.prot}
              type="number"
              name="prot"
              id="number"
              required
            />
          </div>
          <div className="creation__inputs-group-container-item">
            <label htmlFor="fat">Жиры</label>
            <input
              onChange={handleChange}
              onInput={handleInput}
              value={values.fat}
              type="number"
              name="fat"
              id="number"
              required
            />
          </div>
          <div className="creation__inputs-group-container-item">
            <label htmlFor="carbs">Углеводы</label>
            <input
              onChange={handleChange}
              onInput={handleInput}
              value={values.carbs}
              type="number"
              name="carbs"
              id="number"
              required
            />
          </div>
        </div>
        <span id="error-number"></span>
      </div>
      <div className="creation__input-group">
        <label htmlFor="url">Ссылка на картинку</label>
        <input
          onChange={handleChange}
          onInput={handleInput}
          value={values.url}
          type="url"
          name="url"
          id="url"
          placeholder="Введите ссылку"
          pattern="https://.*"
          required
        />
        <span id="error-url"></span>
      </div>
    </form>
  );
}
