"use client"
import React, { useEffect, useState } from 'react'
import './abcGame.css'
import AbcCard from './abcCard'

const imgs = [
  {
    id:1,
    img: "/abcGame/bien.png",
    word: "bien"
  },
  {
    id:2,
    img: "/abcGame/como.png",
    word: "como"
  },{
    id:3,
    img: "/abcGame/cual.png",
    word: "cual"
  },{
    id:4,
    img: "/abcGame/cuando.png",
    word: "cuando"
  },{
    id:5,
    img: "/abcGame/cuantos.png",
    word: "cuantos"
  },{
    id:6,
    img: "/abcGame/donde.png",
    word: "donde"
  },{
    id:7,
    img: "/abcGame/es.png",
    word: "es"
  },{
    id:8,
    img: "/abcGame/gracias.png",
    word: "gracias"
  },{
    id:9,
    img: "/abcGame/mal.png",
    word: "mal"
  },{
    id:10,
    img: "/abcGame/nop.png",
    word: "nop"
  },
  // {
  //   id:11,
  //   img: "/abcGame/para.png",
  //   word: "para"
  // },{
  //   id:12,
  //   img: "/abcGame/perdon.png",
  //   word: "perdon"
  // },{
  //   id:13,
  //   img: "/abcGame/por.png",
  //   word: "por"
  // },{
  //   id:14,
  //   img: "/abcGame/porfa.png",
  //   word: "porfa"
  // },{
  //   id:15,
  //   img: "/abcGame/que.png",
  //   word: "que"
  // },{
  //   id:16,
  //   img: "/abcGame/quePaso.png",
  //   word: "quePaso"
  // },{
  //   id:17,
  //   img: "/abcGame/quien.png",
  //   word: "quien"
  // },{
  //   id:18,
  //   img: "/abcGame/si.png",
  //   word: "si"
  // },{
  //   id:19,
  //   img: "/abcGame/with.png",
  //   word: "with"
  // },{
  //   id:20,
  //   img: "/abcGame/ya.png",
  //   word: "ya"
  // },
]

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const AbcGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    const shuffledCards = shuffle(
      imgs.flatMap(({ img, word }) => [
        { content: img, type: "image", word },  // Carta con imagen
        { content: word, type: "word", word },  // Carta con palabra
      ])
    );
    setCards(shuffledCards);
    console.log(shuffledCards)
  }, []);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.word === secondCard.word && firstCard.type !== secondCard.type) {
        setMatchedPairs((prev) => [...prev, firstCard.word]);
      }

      setTimeout(() => setFlippedIndices([]), 1000);
      setTurns((prev) => prev + 1);
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (index) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index)) {
      setFlippedIndices((prev) => [...prev, index]);
    }
  };

  return (
    <div className="memory-game">
      <div className="card-grid">
        {cards.map((card, index) => (
          <AbcCard 
          key={index}
          content={card.content}
          type={card.type}
            onClick={() => handleCardClick(index)}
            isFlipped={flippedIndices.includes(index) || matchedPairs.includes(card.word)}
          
          />
        ))}
      </div>
      <div className="text-black font-semibold text-xl mt-10">
        <p>Turns: {turns}</p>
        <p>Matched Pairs: {matchedPairs.length}</p>
      </div>
    </div>
  )
}

export default AbcGame