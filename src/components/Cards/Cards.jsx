import "./Cards.css";
import Card from "../Card/Card";

function Cards({ cards, ccalsList, handlePopupClick, setSelectedMealId }) {
  return (
    <section className="cards">
      <ul className="cards__list">
        {cards.map((card) => (
          <Card
            setSelectedMealId={setSelectedMealId}
            handlePopupClick={handlePopupClick}
            id={card.id}
            key={card.id}
            imgPath={card.products[0].imagePath}
            title={card.title}
            texts={card.products.map((product) => product.text)}
            grams={card.products.map((product) => product.grams)}
            ccalsList={ccalsList}
          />
        ))}
        <Card
          isFunctionalCard
          handlePopupClick={handlePopupClick}
          setSelectedMealId={setSelectedMealId}
        />
      </ul>
    </section>
  );
}

export default Cards;
