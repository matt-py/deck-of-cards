import { useState } from "react";
import CardDisplay from "./CardDisplay";
import './styles.css';

const DEFAULT_CARDLIST = [
  "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h", "12h", "13h",
  "1c", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "11c", "12c", "13c",
  "1d", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "11d", "12d", "13d",
  "1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "11s", "12s", "13s",
];

export default function App() {
  const [cards, setCards] = useState(DEFAULT_CARDLIST);
  const [displayedCards, setDisplayedCards] = useState([]);

  const displayAllCards = () => {
    setDisplayedCards([
      ...displayedCards,
      ...cards
    ]);
    setCards([]);
  }

  const hideAllCards = () => {
    setCards([
      ...cards,
      ...displayedCards
    ]);
    setDisplayedCards([]);
  }

  const drawCard = () => {
    if (!cards.length) { return };
    const newCards = [...cards];
    setDisplayedCards([
      ...displayedCards,
      newCards.shift()
    ]);
    setCards(newCards);
  }

  // Known basic shuffle algorithm
  const shuffleArray = (array) => {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const shuffleCards = () => {
    const shuffledCards = shuffleArray([...cards]);
    const shuffledDisplayedCards = shuffleArray([...displayedCards]);
    setCards([...shuffledCards]);
    setDisplayedCards([...shuffledDisplayedCards]);
  }

  const sortCards = () => {
    const suitOrder = {
      "h": 1,
      "c": 2,
      "d": 3,
      "s": 4
    };
    const sortedCards = [...displayedCards].sort((a, b) => {
      let val = suitOrder[a.slice(-1)] - suitOrder[b.slice(-1)];
      if (val === 0) {
        return (+a.slice(0, -1)) - (+b.slice(0, -1));
      } else {
        return val;
      }
    });
    setDisplayedCards(sortedCards);
  }

  return (
    <div>
      <button type="button" className="button" onClick={displayAllCards} disabled={!cards.length}>
        Display all cards
      </button>
      <button type="button" className="button" onClick={hideAllCards} disabled={!displayedCards.length}>
        Return cards to bottom of deck
      </button>
      <button type="button" className="button" onClick={drawCard} disabled={!cards.length}>
        Draw a card
      </button>
      <button type="button" className="button" onClick={shuffleCards}>
        Shuffle all cards
      </button>
      <button type="button" className="button" onClick={sortCards} disabled={!displayedCards.length}>
        Sort displayed cards
      </button>
      <CardDisplay cards={displayedCards}/>
    </div>
  );
}
