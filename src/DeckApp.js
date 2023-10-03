import React, { useEffect, useState } from "react";

const NEW_DECK_URL =
  "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

function DeckApp() {
  const [deck, setDeck] = useState({ deckId: "", cards: [] });
  //state for isLoading OR conditional depending on !deckId

  useEffect(function getNewDeck() {
    async function fetchNewDeck() {
      const response = await fetch(NEW_DECK_URL);
      const deck = await response.json();
      setDeck(d => ({ ...d, deckId: deck.deck_id }));
    }
    fetchNewDeck();
  }, []);

}

export default DeckApp;