import React, { useEffect, useState } from "react";
import Card from "./Card";

const DECK_API_URL = "https://deckofcardsapi.com/api/deck/";

/**
 * DeckApp: Makes call to API to get an initial deck of cards after first
 * render, then renders button to make another call to API and render Card
 * components
 *
 * TODO: talk about effects
 *
 * State:
 * - deck: Object that holds deck ID and array of card objects from API calls
 * { deckId: "", cards: [] }
 *
 * App => DeckApp => Card
 *
 */

function DeckApp() {
  const [deck, setDeck] = useState({ deckId: "", cards: [] });

  /** Makes fetch request to get a new deck on first render of DeckApp,
   * updates state with deck ID
   */
  useEffect(function getNewDeck() {
    async function fetchNewDeck() {
      const response = await fetch(`${DECK_API_URL}new/shuffle/?deck_count=1`);
      const cardDeck = await response.json();

      setDeck(d => ({ ...d, deckId: cardDeck.deck_id }));
    }
    fetchNewDeck();
  }, []);

  /**Handles click on "Draw a card" button*/
  function handleClick(evt) {
    evt.preventDefault();
    drawCard();
  }

  /** Makes fetch request to get a card from the deck initialized on first
   * render, updates state by adding new card to card array
   */
  async function drawCard() {
    const response = await fetch(`${DECK_API_URL}${deck.deckId}/draw/?count=1`);
    const currCardData = await response.json();
    const currCard = currCardData.cards[0];

    setDeck(d => ({ ...d, cards: [...d.cards, currCard] }));
  }

  return (
    <div>
      {!deck.deckId
        ? <p>Loading!</p>
        : <form onClick={handleClick}>
          <button>
            Draw a Card
          </button>
        </form>}
      {deck.cards.length > 0 && deck.cards.map(card =>
        <Card key={card.code} card={card} />
      )}
    </div>
  );

}

export default DeckApp;