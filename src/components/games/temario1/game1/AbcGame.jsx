"use client";
import React, { useEffect, useState } from "react";
import "./abcGame.css";
import AbcCard from "./AbcCard";
import { saveGame } from "@/services/games.service";
import { getAccessToken } from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import { Rating } from "@/components/ui/rating";

const letterPairs = [
  { id: 1, upper: "A", lower: "a" },
  { id: 2, upper: "B", lower: "b" },
  { id: 3, upper: "C", lower: "c" },
  { id: 4, upper: "D", lower: "d" },
  { id: 5, upper: "E", lower: "e" },
  { id: 6, upper: "F", lower: "f" },
];

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const AbcGame = ({ onComplete, onNextGame, onGoHome }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [turns, setTurns] = useState(0);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (token) {
        const user = jwtDecode(token);
        setUser(user);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const shuffledCards = shuffle(
      letterPairs.flatMap(({ upper, lower }) => [
        { content: upper, type: "upper", pair: upper },
        { content: lower, type: "lower", pair: upper },
      ])
    );
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (matchedPairs.length === letterPairs.length && !gameCompleted) {
      setShowModal(true);
      setGameCompleted(true);
      onComplete(matchedPairs.length, turns);
    }
  }, [matchedPairs, gameCompleted, turns, onComplete]);

  const handleCardClick = (index) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index)) {
      setFlippedIndices((prev) => [...prev, index]);
    }
  };

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (
        firstCard.pair === secondCard.pair &&
        firstCard.type !== secondCard.type
      ) {
        setMatchedPairs((prev) => [...prev, firstCard.pair]);
      }

      setTimeout(() => setFlippedIndices([]), 1000);
      setTurns((prev) => prev + 1);
    }
  }, [flippedIndices]);

  const handleGameAgain = () => {
    setShowModal(false);
    setGameCompleted(false);

    const reshuffled = shuffle(
      letterPairs.flatMap(({ upper, lower }) => [
        { content: upper, type: "upper", pair: upper },
        { content: lower, type: "lower", pair: upper },
      ])
    );
    setCards(reshuffled);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setTurns(0);
  };

  const handleCloseModal = () => {
    setShowModal(false);

    onNextGame();
  };

  return (
    <div>
      <div className="flex flex-col justify-start items-center p-4 md:p-10 ">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
          ¡Encuentra las parejas de letras!
        </h1>
        <p className="text-blue-800 text-base sm:text-lg max-w-3xl mx-auto">
          Encuentra las letras mayúsculas y minúsculas de las siguientes letras
        </p>
        <Rating score={turns} />
        <div className="card-grid mt-5">
          {cards.map((card, index) => (
            <AbcCard
              key={index}
              content={card.content}
              type={card.type}
              onClick={() => handleCardClick(index)}
              isFlipped={
                flippedIndices.includes(index) ||
                matchedPairs.includes(card.pair)
              }
            />
          ))}
        </div>

        <div className="text-black font-semibold text-xl mt-10">
          <p>Parejas encontradas: {matchedPairs.length}</p>
          <p>Intentos: {turns}</p>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h3 className="text-lg font-bold text-center text-gray-900">
                ¡Juego Terminado!
              </h3>
              <p className="py-4 text-center text-gray-900">
                ¡Felicidades por completar el juego!
              </p>
              <div className="text-center space-y-4">
                <p className="text-xl font-semibold text-gray-900">
                  Intentos realizados:{" "}
                  <span className="text-blue-500">{turns}</span>
                </p>
              </div>
              <p className="text-center mt-4 text-gray-900">
                {turns <= 30
                  ? "¡Excelente trabajo!"
                  : turns <= 60
                  ? "¡Bien hecho! Pero puedes mejorar."
                  : "Sigue intentándolo, lo harás mejor la próxima vez."}
              </p>
              <div className="mt-6 flex justify-center">
                <button
                  className="btn bg-green-500 text-white border-green-900 border-2 hover:bg-green-950"
                  onClick={handleCloseModal}
                >
                  Siguiente Juego
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AbcGame;



