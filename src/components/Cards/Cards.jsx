import "./Cards.css";
import Card from "../Card/Card";
import breakfastImgPath from "../../images/breakfast.jpg";
import supperImgPath from "../../images/supper.jpg";
import lunchImgPath from "../../images/lunch.jpg";
import dinnerImgPath from "../../images/dinner.jpg";

function Cards() {
  return (
    <section className="cards">
      <ul className="cards__list">
        <Card
          imgPath={breakfastImgPath}
          title="Завтрак"
          text="Каша овсяная"
          ccals="269 ккал"
        />
        <Card
          imgPath={supperImgPath}
          title="Перекус"
          text="Яблоко"
          ccals="89 ккал"
        />
        <Card
          imgPath={lunchImgPath}
          title="Обед"
          text="Борщ куриный"
          ccals="286 ккал"
        />
        <Card
          imgPath={supperImgPath}
          title="Перекус"
          text="Яйцо вареное"
          ccals="101 ккал"
        />
        <Card
          imgPath={dinnerImgPath}
          title="Ужин"
          text="Курица отварная, рис"
          ccals="333 ккал"
        />
      </ul>
    </section>
  );
}

export default Cards;
