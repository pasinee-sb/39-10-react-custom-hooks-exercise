import React, { useState } from "react";

import PlayingCard from "./PlayingCard";
import { useAxios } from "./hook";
import "./PlayingCardList.css";
import { formatCard } from "./helpers";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  // const [dataArr, addNewObj] = useAxios(
  //   "https://deckofcardsapi.com/api/deck/new/draw/"
  // );
  // // const [cards, setCards] = useState([]);
  // // const addCard = async () => {
  // //   const response = await axios.get(
  // //     "https://deckofcardsapi.com/api/deck/new/draw/"
  // //   );
  // //   setCards((cards) => [...cards, { ...response.data, id: uuid() }]);
  // // };
  // return (
  //   <div className="PlayingCardList">
  //     <h3>Pick a card, any card!</h3>
  //     <div>
  //       <button onClick={addNewObj}>Add a playing card!</button>
  //     </div>
  //     <div className="PlayingCardList-card-area">
  //       {dataArr &&
  //         dataArr.map((cardData) => (
  //           <PlayingCard key={cardData.id} front={cardData.cards[0].image} />
  //         ))}
  //     </div>
  //   </div>
  // );

  const [cards, addCard, clearCards] = useAxios(
    "cards",
    "https://deckofcardsapi.com/api/deck/new/draw/"
  );
  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={() => addCard(formatCard)}>Add a playing card!</button>
        <button onClick={clearCards}>Clear the table</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map((card) => (
          <PlayingCard key={card.id} front={card.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
