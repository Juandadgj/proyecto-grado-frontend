"use client";
import GameCompleteModal from "@/components/GameCompleteModal";
import { Rating } from "@/components/ui/rating";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Cell = {
  letter: string;
  editable: boolean;
};

const fullAlphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

const generateGrid = (): Cell[] => {
  const hiddenIndexes = new Set<number>();
  while (hiddenIndexes.size < 8) {
    const index = Math.floor(Math.random() * fullAlphabet.length);
    hiddenIndexes.add(index);
  }

  return fullAlphabet.map((letter, index) => ({
    letter: hiddenIndexes.has(index) ? "" : letter,
    editable: hiddenIndexes.has(index),
  }));
};

export default function AlphabetGridGame() {
  const router = useRouter();
  const [grid, setGrid] = useState<Cell[]>(generateGrid());
  const [result, setResult] = useState<boolean | null>(null);
  const [rating, setRating] = useState(0);
  const handleChange = (index: number, value: string) => {
    setRating(rating + 1);
    const updated = [...grid];
    updated[index].letter = value.toUpperCase().slice(-1);
    setGrid(updated);
  };

  const validate = () => {
    const correct = grid.every(
      (cell, index) => cell.letter === fullAlphabet[index]
    );
    setResult(correct);
    if (correct) {
      const modal = document.getElementById(
        "game_complete_modal"
      ) as HTMLDialogElement;
      modal?.showModal();
    }
  };

  const onNextGame = () => {
    // Aquí podrías redirigir con router.push('/') si usas Next.js router
    router.push("/dashboard/games");
  };

  const onGoHome = () => {
    // Aquí podrías redirigir con router.push('/') si usas Next.js router
    console.log("Volviendo al inicio...");
  };

  return (
    <div className="p-6 w-full text-center space-y-6">
      <h2 className="text-3xl font-bold">Completa el abecedario</h2>
      <Rating score={rating} />
      <div className="grid grid-cols-8 gap-4 w-full max-w-6xl mx-auto px-4">
        {grid.map((cell, i) => (
          <div
            key={i}
            className="w-14 h-14 border border-gray-300 flex items-center justify-center rounded bg-white shadow-md"
          >
            {cell.editable ? (
              <input
                type="text"
                maxLength={1}
                value={cell.letter}
                onChange={(e) => handleChange(i, e.target.value)}
                className="w-full h-full text-center text-xl bg-white outline-none"
              />
            ) : (
              <span className="font-semibold text-xl">{cell.letter}</span>
            )}
          </div>
        ))}
      </div>

      {result !== null && (
        <p
          className={`font-semibold text-lg ${
            result ? "text-green-600" : "text-red-600"
          }`}
        >
          {result
            ? "¡Muy bien! Completaste el abecedario."
            : "Hay algunos errores. ¡Intenta otra vez!"}
        </p>
      )}

      <div className="space-x-4 mt-4">
        <button
          onClick={validate}
          className="bg-blue-600 text-white px-6 py-3 rounded text-lg font-medium hover:bg-blue-700"
        >
          Validar
        </button>
        <button
          onClick={() => {
            setGrid(generateGrid());
            setResult(null);
          }}
          className="bg-gray-300 text-black px-6 py-3 rounded text-lg font-medium hover:bg-gray-400"
        >
          Reiniciar
        </button>
      </div>
      <GameCompleteModal
        onNextGame={onNextGame}
        onGoHome={onGoHome}
        rating={rating}
      />
    </div>
  );
}
