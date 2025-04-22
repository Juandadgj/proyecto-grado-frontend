"use client";
import React, { useEffect, useState } from "react";
import "./abcGame.css";
import AbcCard from "./abcCard";
import { saveGame } from "@/services/games.service";
import { getAccessToken } from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";

const imgs = [
  {
    id: 1,
    img: "/abcGame/BALON.jpg",
    word: "Balón",
  },
  {
    id: 2,
    img: "/abcGame/CABALLO.jpg",
    word: "Caballo",
  },
  // {
    // id: 3,
    // img: "/abcGame/ELEFANTE.jpg",
    // word: "Elefante",
  // },
  // {
    // id: 4,
    // img: "/abcGame/GATO.jpg",
    // word: "Gato",
  // },
  // {
    // id: 5,
    // img: "/abcGame/JIRAFA.jpg",
    // word: "Jirafa",
  // },
  // {
    // id: 6,
    // img: "/abcGame/LEÓN.jpg",
    // word: "León",
  // },
  // {
    // id: 7,
    // img: "/abcGame/SAPO.jpg",
    // word: "Sapo",
  // },
  // {
    // id: 8,
    // img: "/abcGame/PELOTA.jpg",
    // word: "Pelota",
  // },
  // {
    // id: 9,
    // img: "/abcGame/RATÓN.jpg",
    // word: "Ratón",
  // },
  // {
    // id: 10,
    // img: "/abcGame/SOMBRERO RANA.jpg",
    // word: "Sombrero",
  // },
];

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const AbcGame = ({ score, setScore, onNextGame, onGoHome }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [turns, setTurns] = useState(0);
  const [user, setUser] = useState(null);
  const [scorePercentage, SetScorePercentage] = useState(0);

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
      imgs.flatMap(({ img, word }) => [
        { content: img, type: "image", word },
        { content: word, type: "word", word },
      ])
    );
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (matchedPairs.length === imgs.length) {
      document.getElementById("abc_modal").checked = true;

      let calculatedScore = 0;
      if (turns <= 30) calculatedScore = 100;
      else if (turns <= 60) calculatedScore = (30 - (turns - 30)) * 3.33;
      else calculatedScore = 0;

      SetScorePercentage(calculatedScore);
      setScore(prev => prev + calculatedScore);

      saveGame({
        type: "AbcGame",
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
        firstCard.word === secondCard.word &&
        firstCard.type !== secondCard.type
      ) {
        setMatchedPairs((prev) => [...prev, firstCard.word]);
      }

      setTimeout(() => setFlippedIndices([]), 1000);
      setTurns((prev) => prev + 1);
    }
  }, [flippedIndices]);

  const handleGameAgain = () => {
    document.getElementById("abc_modal").checked = false;
    const reshuffled = shuffle(
      imgs.flatMap(({ img, word }) => [
        { content: img, type: "image", word },
        { content: word, type: "word", word },
      ])
    );
    setCards(reshuffled);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setTurns(0);
    SetScorePercentage(0);
  };

  const handleCloseModal = () => {
    document.getElementById("abc_modal").checked = false;
    onNextGame();
  };

  return (
    <div>
      <div className="memory-game">
        <div className="card-grid">
          {cards.map((card, index) => (
            <AbcCard
              key={index}
              content={card.content}
              type={card.type}
              onClick={() => handleCardClick(index)}
              isFlipped={
                flippedIndices.includes(index) ||
                matchedPairs.includes(card.word)
              }
            />
          ))}
        </div>

        <div className="text-black font-semibold text-xl mt-10">
          <p>Intentos: {turns}</p>
          <p>Parejas encontradas: {matchedPairs.length}</p>
        </div>

        {/* MODAL */}
        <input type="checkbox" id="abc_modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box bg-white">
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

            <div className="modal-action justify-between">
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

        <div className="w-full flex justify-center items-center text-black font-semibold text-xl">
          <p>Puntaje acumulado: {score ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AbcGame;
