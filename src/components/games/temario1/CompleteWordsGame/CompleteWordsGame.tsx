"use client";
import { useRouter } from "next/navigation";
import GameCompleteModal from "@/components/GameCompleteModal";
import { Rating } from "@/components/ui/rating";
import React, { useState } from "react";

type WordPart = {
  type: "text" | "input";
  value: string;
};

type Sentence = {
  id: number;
  parts: WordPart[]; // Alterna entre texto y campos a llenar
  solution: string;
  image?: string;
};

const sentences: Sentence[] = [
  {
    id: 1,
    solution: "Caballo",
    parts: [
      { type: "text", value: "Cab" },
      { type: "input", value: "" },
      { type: "input", value: "" },
      { type: "text", value: "lo" },
    ],
    image: "/caballo.jpg",
  },
  {
    id: 3,
    solution: "Pelota",
    parts: [
      { type: "text", value: "Pe" },
      { type: "input", value: "" },
      { type: "input", value: "" },
      { type: "text", value: "ta" },
    ],
    image: "/pelota.jpg",
  },
  {
    id: 4,
    solution: "Casa",
    parts: [
      { type: "text", value: "C" },
      { type: "input", value: "" },
      { type: "text", value: "sa" },
    ],
    image: "/casa.jpg",
  },
  {
    id: 5,
    solution: "Gato",
    parts: [
      { type: "text", value: "G" },
      { type: "input", value: "" },
      { type: "text", value: "to" },
    ],
    image: "/gato.jpg",
  },
  {
    id: 6,
    solution: "Amigo",
    parts: [
      { type: "text", value: "A" },
      { type: "input", value: "" },
      { type: "input", value: "" },
      { type: "text", value: "go" },
    ],
    image: "/amigo.jpg",
  },
  {
    id: 7,
    solution: "Flor",
    parts: [
      { type: "text", value: "F" },
      { type: "input", value: "" },
      { type: "text", value: "or" },
    ],
    image: "/flor.jpg",
  },
  {
    id: 8,
    solution: "Sol",
    parts: [
      { type: "text", value: "S" },
      { type: "input", value: "" },
      { type: "text", value: "l" },
    ],
    image: "/sol.jpg",
  },
  {
    id: 9,
    solution: "Manzana",
    parts: [
      { type: "text", value: "Man" },
      { type: "input", value: "" },
      { type: "input", value: "" },
      { type: "text", value: "na" },
    ],
    image: "/manzana.jpg",
  },
  {
    id: 10,
    solution: "Perro",
    parts: [
      { type: "text", value: "P" },
      { type: "input", value: "" },
      { type: "input", value: "" },
      { type: "text", value: "ro" },
    ],
    image: "/perro.jpg",
  },
];

interface CompleteWordsGameProps {
  onComplete: (correctWords: number, attempts: number) => void;
  onGoHome: () => void;
  showRating?: boolean; // Nueva prop para controlar la visibilidad del Rating
}

export default function CompleteWordsGame({ 
  onComplete, 
  onGoHome,
  showRating = false 
}: CompleteWordsGameProps) {
  const [entries, setEntries] = useState(() => {
    return sentences.map(sentence => ({
      ...sentence,
      parts: sentence.parts.map(part => ({
        ...part,
        value: part.type === 'input' ? '' : part.value
      }))
    }));
  });
  const [results, setResults] = useState<(boolean | null)[]>(Array(sentences.length).fill(null));
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const router = useRouter();

  // Maneja el cambio de letras
  const handleChange = (sentenceIndex: number, partIndex: number, value: string) => {
    if (completed || isValidating) return;

    const updated = [...entries];
    const oldValue = updated[sentenceIndex].parts[partIndex].value;
    const newValue = value.slice(-1); // Solo toma el último carácter
    updated[sentenceIndex].parts[partIndex].value = newValue;
    setEntries(updated);

    // Si se escribió una letra y no es la última, pasa al siguiente input
    if (value && partIndex < updated[sentenceIndex].parts.length - 1) {
      const nextInput = document.getElementById(`input-${sentenceIndex}-${partIndex + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  // Maneja la eliminación de letras (retroceder)
  const handleRemoveLetter = (sentenceIndex: number, partIndex: number) => {
    if (completed || isValidating) return;

    const updated = [...entries];
    updated[sentenceIndex].parts[partIndex].value = ""; // Borra la letra
    setEntries(updated);

    // Si hay una letra eliminada, pasa al input anterior
    if (partIndex > 0) {
      const prevInput = document.getElementById(`input-${sentenceIndex}-${partIndex - 1}`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  // Validar respuestas
  const validate = () => {
    if (completed || isValidating) return;
    setIsValidating(true);

    const newResults = entries.map((sentence, idx) => {
      const reconstructed = sentence.parts
        .map((p) => (p.type === "text" ? p.value : p.value))
        .join("");
      return reconstructed.toLowerCase() === sentence.solution.toLowerCase();
    });
    
    setResults(newResults);

    // Verifica si todas están correctas
    const allCorrect = newResults.every((r) => r);
    if (allCorrect) {
      setCompleted(true);
      const correctWords = newResults.filter(Boolean).length;
      onComplete(correctWords, attempts);
    } else {
      // Si hay errores, incrementar intentos
      setAttempts(prev => prev + 1);
    }

    setIsValidating(false);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {showRating && (
        <div className="flex justify-between items-center mb-6">
          <Rating 
            score={attempts} 
            label="Intentos" 
            variant={
              attempts > 15 ? 'error' : 
              attempts > 10 ? 'warning' : 
              'default'
            } 
          />
        </div>
      )}

      <h2 className="text-2xl font-bold text-center mb-6">
        Completa la palabra u oración
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((sentence, sIndex) => {
          const showError = results[sIndex] === false;

          return (
            <div
              key={sentence.id}
              className={`p-4 border rounded-xl shadow-md bg-white flex flex-col items-center justify-center text-lg space-y-2 ${
                showError ? 'border-red-200 bg-red-50' : ''
              }`}
            >
              <img
                src={sentence.image}
                alt={sentence.solution}
                className="w-32 h-32 mb-4"
              />
              <div className="flex flex-wrap justify-center space-x-1">
                {sentence.parts.map((part, pIndex) =>
                  part.type === "text" ? (
                    <span key={pIndex}>{part.value}</span>
                  ) : (
                    <div key={pIndex} className="relative">
                      <input
                        id={`input-${sIndex}-${pIndex}`}
                        type="text"
                        maxLength={1}
                        value={part.value}
                        onChange={(e) => handleChange(sIndex, pIndex, e.target.value)}
                        onBlur={() => {}}
                        className={`w-8 h-8 border-b-2 text-center mx-0.5 bg-white focus:outline-none ${
                          showError ? 'border-red-500 text-red-500' : 
                          results[sIndex] === true ? 'border-green-500 text-green-500' : 
                          'border-gray-400'
                        }`}
                        disabled={completed || isValidating}
                      />
                      {part.value && !completed && !isValidating && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLetter(sIndex, pIndex)}
                          className="absolute top-0 right-0 text-xs text-red-400"
                        >
                          x
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>
              {results[sIndex] !== null && (
                <div
                  className={`text-sm font-semibold ${
                    results[sIndex] ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {results[sIndex] ? "¡Correcto!" : "Inténtalo de nuevo"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={validate}
          disabled={completed || isValidating}
          className={`px-6 py-2 rounded ${
            completed || isValidating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Validar
        </button>
      </div>

      {completed && (
        <GameCompleteModal
          onGoHome={onGoHome}
          rating={attempts}
          showNextButton={false}
        />
      )}
    </div>
  );
}
