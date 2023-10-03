import React, { useEffect, useState } from "react";

const NEW_DECK_URL =
  "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

const NEW_CARD_URL = "https://deckofcardsapi.com/api/deck/"

function DeckApp() {
  const [deck, setDeck] = useState({ deckId: "", cards: [] });
  //state for isLoading OR conditional depending on !deckId

  useEffect(function getNewDeck() {
    async function fetchNewDeck() {
      const response = await fetch(NEW_DECK_URL);
      const cardDeck = await response.json();
      setDeck(d => ({ ...d, deckId: cardDeck.deck_id }));
      console.log(`Our Deck is`, deck)
    }
    fetchNewDeck();
  }, []);

  function handleClick(evt){
    evt.preventDefault();
    drawCard();
  }

  async function drawCard(){
    const response = await fetch(`${NEW_CARD_URL}${deck.deckId}/draw/?count=1`);
    // console.log(`Our response is`, response);
    const currCardData = await response.json();
    // console.log(`Our cards are`, currCardData);
    const currCard = currCardData.cards[0];
    // console.log(`currCard is`, currCard);
    setDeck( d=> ({...d, cards: [...d.cards, currCard]}));
  }

  return(
    <div>
      {!deck.deckId
      ? <p>Loading!</p>
      : <form onClick={handleClick}>
          <button>
            Draw a Card
          </button>
        </form>}
    </div>
  )

}

export default DeckApp;