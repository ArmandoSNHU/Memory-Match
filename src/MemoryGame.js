// src/MemoryGame.js
import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const generateCards = () => {
  const icons = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍑', '🍍'];
  const cards = [...icons, ...icons]
    .sort(() => Math.random() - 0.5)
    .map((icon, index) => ({
      id: index,
      icon,
      flipped: false,
      matched: false
    }));
  return cards;
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.icon === secondCard.icon) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.icon === firstCard.icon
              ? { ...card, matched: true }
              : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 1000);
      }
      setAttempts((prev) => prev + 1);
      setFlippedCards([]);
    }
  }, [flippedCards]);

  const handleCardClick = (card) => {
    if (!card.flipped && !card.matched && flippedCards.length < 2) {
      setCards((prevCards) =>
        prevCards.map((c) =>
          c.id === card.id ? { ...c, flipped: true } : c
        )
      );
      setFlippedCards((prev) => [...prev, card]);
    }
  };

  const resetGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMatchedPairs(0);
    setAttempts(0);
  };

  return (
    <div className="game-container">
      <h1>Memory Match</h1>
      <div className="score-board">
        <p>Attempts: {attempts}</p>
        <p>Matched Pairs: {matchedPairs}</p>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            {card.flipped || card.matched ? card.icon : '❓'}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default MemoryGame;
