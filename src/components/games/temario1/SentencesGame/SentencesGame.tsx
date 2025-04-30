"use client";

import { useState, useEffect } from "react";
import GameCompleteModal from "@/components/GameCompleteModal";
import { useRouter } from "next/navigation";
import { Rating } from "@/components/ui/rating";

const rounds = [
  {
    sentence: "El perro ladra fuerte.",
    type: "verbo",
    answer: "ladra",
  },
  {
    sentence: "Mi hermana cocina muy bien.",
    type: "verbo",
    answer: "cocina",
  },
  {
    sentence: "Los niños juegan en el parque.",
    type: "verbo",
    answer: "juegan",
  },
  {
    sentence: "Pedro corre en las mañanas.",
    type: "sujeto",
    answer: "Pedro",
  },
  {
    sentence: "La profesora enseña matemáticas.",
    type: "sujeto",
    answer: "La profesora",
  },
  {
    sentence: "Mi abuela teje suéteres.",
    type: "sujeto",
    answer: "Mi abuela",
  },
];

export default function IdentifySentencePartsGame() {
  const [currentRound, setCurrentRound] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const current = rounds[currentRound];
  const words = current.sentence.split(" ");

  const handleWordClick = (word: string) => {
    setSelected(word);
    const normalizedAnswer = current.answer.toLowerCase();
    const normalizedSelection = word.toLowerCase();

    if (
      normalizedSelection === normalizedAnswer ||
      normalizedAnswer.includes(normalizedSelection)
    ) {
      setScore((prev) => prev + 5);
      setTimeout(() => {
        if (currentRound + 1 < rounds.length) {
          setCurrentRound(currentRound + 1);
          setSelected(null);
        } else {
          setCompleted(true);
          (document.getElementById("game_complete_modal") as HTMLDialogElement)?.showModal();
        }
      }, 600);
    } else {
      setAttempts((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full  flex items-center justify-center px-4">
      <div className="w-full max-w-xl ">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-900">
          Identifica el <span className="font-extrabold underline">{current.type}</span>
        </h2>

        <Rating score={score} />

        <div className="flex flex-wrap gap-2 justify-center mb-6 mt-2">
          {words.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordClick(word)}
              className={`px-3 py-2 border rounded-lg transition-all duration-200 ${
                selected === word
                  ? word.toLowerCase() === current.answer.toLowerCase() ||
                    current.answer.toLowerCase().includes(word.toLowerCase())
                    ? "bg-green-300 border-green-600"
                    : "bg-red-300 border-red-600"
                  : "bg-white border-gray-300 hover:bg-gray-100"
              }`}
            >
              {word}
            </button>
          ))}
        </div>

        <p className="text-center text-gray-700">
          Frase: <span className="font-medium">{current.sentence}</span>
        </p>

        <div className="text-center text-blue-800 font-medium mb-2 mt-4">
          Progreso: {currentRound} / {rounds.length} completados
        </div>

      </div>

      <GameCompleteModal
        onGoHome={() => {
          (document.getElementById("game_complete_modal") as HTMLDialogElement)?.close();
          router.push("/dashboard/games");
        }}
        rating={score}
      />
    </div>
  );
}
