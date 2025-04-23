"use client";
import React, { useEffect, useState } from "react";
import "./abcGame.css";
import AbcCard from "./abcCard";
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

const AbcGame = ({ score, setScore, onNextGame, onGoHome }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [turns, setTurns] = useState(0);
  const [user, setUser] = useState(null);
  const [scorePercentage, SetScorePercentage] = useState(0);
  const [showModal, setShowModal] = useState(false);

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
    if (matchedPairs.length === letterPairs.length) {
      setShowModal(true);

      let calculatedScore = 0;
      if (turns <= 30) calculatedScore = 100;
      else if (turns <= 60) calculatedScore = (30 - (turns - 30)) * 3.33;
      else calculatedScore = 0;

      SetScorePercentage(calculatedScore);
      setScore((prev) => prev + calculatedScore);

      saveGame({
        game: "AbcGame",
        score: calculatedScore,
        id: user?.id,
        userId: user?.userId,
      });
    }
  }, [matchedPairs]);

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
    SetScorePercentage(0);
  };

  const handleCloseModal = () => {
    setShowModal(false);

    onNextGame();
  };

  return (
    <div>
      <div className="flex flex-col justify-start items-center p-4 md:p-10 ">

        <Rating score={turns} />
        <div className="card-grid">
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
          <p>Intentos: {turns}</p>
          <p>Parejas encontradas: {matchedPairs.length}</p>
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
          Intentos realizados: <span className="text-blue-500">{turns}</span>
        </p>
        <p className="text-xl font-semibold text-gray-900">
          Puntuación:
          <span
            className={`text-2xl font-bold ${
              scorePercentage >= 80
                ? "text-green-500"
                : scorePercentage >= 50
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {" " + scorePercentage}%
          </span>
        </p>
      </div>
      <p className="text-center mt-4 text-gray-900">
        {scorePercentage >= 80
          ? "¡Excelente trabajo!"
          : scorePercentage >= 50
          ? "¡Bien hecho! Pero puedes mejorar."
          : "Sigue intentándolo, lo harás mejor la próxima vez."}
      </p>
      <div className="mt-6 flex justify-between">
        <button
          className="btn bg-gray-600 text-white border-black border-2"
          onClick={handleGameAgain}
        >
          Repasar Juego
        </button>
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

        <div className="w-full flex justify-center items-center text-black font-semibold text-xl">
          <p>Puntaje acumulado: {score ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AbcGame;

