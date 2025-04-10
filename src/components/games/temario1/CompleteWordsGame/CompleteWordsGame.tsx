'use client';

import React, { useState } from 'react';

type WordPart = {
  type: 'text' | 'input';
  value: string;
};

type Sentence = {
  id: number;
  parts: WordPart[]; // Alterna entre texto y campos a llenar
  solution: string;
};

const sentences: Sentence[] = [
  {
    id: 1,
    solution: 'Caballo',
    parts: [
      { type: 'text', value: 'Cab' },
      { type: 'input', value: '' },
      { type: 'input', value: '' },
      { type: 'text', value: 'lo' },
    ],
  },
  {
    id: 3,
    solution: 'Pelota',
    parts: [
      { type: 'text', value: 'Pe' },
      { type: 'input', value: '' },
      { type: 'input', value: '' },
      { type: 'text', value: 'ta' },
    ],
  },
  {
    id: 4,
    solution: 'Casa',
    parts: [
      { type: 'text', value: 'C' },
      { type: 'input', value: '' },
      { type: 'text', value: 'sa' },
    ],
  },
  {
    id: 5,
    solution: 'Gato',
    parts: [
      { type: 'text', value: 'G' },
      { type: 'input', value: '' },
      { type: 'text', value: 'to' },
    ],
  },
  {
    id: 6,
    solution: 'Amigo',
    parts: [
      { type: 'text', value: 'A' },
      { type: 'input', value: '' },
      { type: 'input', value: '' },
      { type: 'text', value: 'go' },
    ],
  },
  {
    id: 7,
    solution: 'Flor',
    parts: [
      { type: 'text', value: 'F' },
      { type: 'input', value: '' },
      { type: 'text', value: 'or' },
    ],
  },
  {
    id: 8,
    solution: 'Sol',
    parts: [
      { type: 'text', value: 'S' },
      { type: 'input', value: '' },
      { type: 'text', value: 'l' },
    ],
  },
  {
    id: 9,
    solution: 'Manzana',
    parts: [
      { type: 'text', value: 'Man' },
      { type: 'input', value: '' },
      { type: 'input', value: '' },
      { type: 'text', value: 'na' },
    ],
  },
  {
    id: 10,
    solution: 'Perro',
    parts: [
      { type: 'text', value: 'P' },
      { type: 'input', value: '' },
      { type: 'input', value: '' },
      { type: 'text', value: 'ro' },
    ],
  },
];

export default function CompleteWordsGame() {
  const [entries, setEntries] = useState(sentences);
  const [results, setResults] = useState<(boolean | null)[]>(Array(sentences.length).fill(null));

  const handleChange = (sentenceIndex: number, partIndex: number, value: string) => {
    const updated = [...entries];
    updated[sentenceIndex].parts[partIndex].value = value.slice(-1); // Solo 1 letra por input
    setEntries(updated);
  };

  const validate = () => {
    const newResults = entries.map((sentence, idx) => {
      const reconstructed = sentence.parts.map((p) => (p.type === 'text' ? p.value : p.value)).join('');
      return reconstructed.toLowerCase() === sentence.solution.toLowerCase();
    });
    setResults(newResults);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Completa la palabra u oración</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((sentence, sIndex) => (
          <div
            key={sentence.id}
            className="p-4 border rounded-xl shadow-md bg-white flex flex-col items-center justify-center text-lg space-y-2"
          >
            <div className="flex flex-wrap justify-center space-x-1">
              {sentence.parts.map((part, pIndex) =>
                part.type === 'text' ? (
                  <span key={pIndex}>{part.value}</span>
                ) : (
                  <input
                    key={pIndex}
                    type="text"
                    maxLength={1}
                    value={part.value}
                    onChange={(e) => handleChange(sIndex, pIndex, e.target.value)}
                    className="w-8 h-8 border-b-2 border-gray-400 text-center mx-0.5 bg-white focus:outline-none"
                  />
                )
              )}
            </div>
            {results[sIndex] !== null && (
              <div className={`text-sm font-semibold ${results[sIndex] ? 'text-green-600' : 'text-red-600'}`}>
                {results[sIndex] ? '¡Correcto!' : 'Inténtalo de nuevo'}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={validate}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Validar
        </button>
      </div>
    </div>
  );
}