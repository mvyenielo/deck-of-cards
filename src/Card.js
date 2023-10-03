import React from "react";

/**
 * Card: Renders card image
 *
 * Props:
 * - card object with information about a card:
 * {"code": "6H", image: "http...", ...}
 *
 * App => DeckApp => Card
 */
function Card({ card }) {
  return (
    <img src={card.image} />
  );
}

export default Card;