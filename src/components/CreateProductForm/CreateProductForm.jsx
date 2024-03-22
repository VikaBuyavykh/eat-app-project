import "./CreateProductForm.css";

export default function CreateProductForm({
  values,
  handleChange,
  handleFormSbmt,
  onCreationFormInput,
}) {
  return (
    <>
      <form
        onSubmit={handleFormSbmt}
        onInput={onCreationFormInput}
        name="creation"
        id="creation"
        className="creation"
      >
        <div className="creation__input-group">
          <label htmlFor="text">Название продукта/блюда</label>
          <input
            onChange={handleChange}
            value={values.text}
            type="text"
            name="text"
            id="text"
            placeholder="Введите название"
          />
        </div>
        <div className="creation__inputs-group">
          <p className="creation__inputs-group-text">Нутриенты (на 100 г)</p>
          <div className="creation__inputs-group-container">
            <div className="creation__inputs-group-container-item">
              <label htmlFor="ccals">Калории</label>
              <input
                onChange={handleChange}
                value={values.ccals}
                type="number"
                name="ccals"
                id="ccals"
              />
            </div>
            <div className="creation__inputs-group-container-item">
              <label htmlFor="prot">Белки</label>
              <input
                onChange={handleChange}
                value={values.prot}
                type="number"
                name="prot"
                id="prot"
              />
            </div>
            <div className="creation__inputs-group-container-item">
              <label htmlFor="fat">Жиры</label>
              <input
                onChange={handleChange}
                value={values.fat}
                type="number"
                name="fat"
                id="fat"
              />
            </div>
            <div className="creation__inputs-group-container-item">
              <label htmlFor="carbs">Углеводы</label>
              <input
                onChange={handleChange}
                value={values.carbs}
                type="number"
                name="carbs"
                id="carbs"
              />
            </div>
          </div>
        </div>
        <div className="creation__input-group">
          <label htmlFor="url">Ссылка на картинку</label>
          <input
            onChange={handleChange}
            value={values.url}
            type="url"
            name="url"
            id="url"
            placeholder="Введите ссылку"
          />
        </div>
      </form>
    </>
  );
}
