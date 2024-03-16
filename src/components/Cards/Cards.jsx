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
            imgPath={card.imagePath}
            title={card.title}
            text={card.text}
            grams={card.grams}
            ccalsList={ccalsList}
          />
        ))}
        <Card isFunctionalCard handlePopupClick={handlePopupClick} />
      </ul>
    </section>
  );
}

export default Cards;
