"use client";

import React, { useEffect, useState } from "react";

interface Props {
  onGoHome: () => void;
  onComplete: (attempts: number) => void;
}

const DragAndDrop = ({ onGoHome, onComplete }: Props) => {
  const initialLetters = [
    { id: 1, letter: "a", correctList: 1 },
    { id: 2, letter: "e", correctList: 1 },
    { id: 3, letter: "o", correctList: 1 },
    { id: 4, letter: "i", correctList: 2 },
    { id: 5, letter: "u", correctList: 2 },
  ];

  const [letters, setLetters] = useState(
    initialLetters.map((l) => ({ ...l, list: 0 }))
  );
  const [attempts, setAttempts] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const getList = (list: number) => letters.filter((item) => item.list === list);

  const startDrag = (evt: React.DragEvent, item: any) => {
    evt.dataTransfer.setData("itemID", item.id);
  };

  const draggingOver = (evt: React.DragEvent) => evt.preventDefault();

  const onDrop = (evt: React.DragEvent, list: number) => {
    const itemID = parseInt(evt.dataTransfer.getData("itemID"));
    const updated = letters.map((l) =>
      l.id === itemID ? { ...l, list } : l
    );
    setLetters(updated);
    setAttempts(prev => prev + 1);
  };

  useEffect(() => {
    const allClassified = letters.every((l) => l.list !== 0);
    const allCorrect = letters.every((l) => l.list === l.correctList);
    if (allClassified && allCorrect) {
      onComplete(attempts);
    }
  }, [letters, attempts, onComplete]);

  const resetGame = () => {
    setLetters(initialLetters.map((l) => ({ ...l, list: 0 })));
    setAttempts(0);
    setShowModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center text-black mb-6">
        Clasifica las letras según si son vocales abiertas o cerradas
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Banco */}
        <div>
          <h2 className="text-center font-semibold mb-2">Banco</h2>
          <div className="bg-gray-100 p-4 rounded min-h-[150px]">
            {getList(0).map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => startDrag(e, item)}
                className="cursor-pointer p-2 text-center text-lg font-bold bg-white shadow rounded mb-2"
              >
                {item.letter.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        {/* Vocales abiertas */}
        <div
          onDragOver={draggingOver}
          onDrop={(e) => onDrop(e, 1)}
          className="bg-green-100 p-4 rounded min-h-[150px]"
        >
          <h2 className="text-center font-semibold text-green-800 mb-2">
            Vocales Abiertas (A, E, O)
          </h2>
          {getList(1).map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => startDrag(e, item)}
              className="cursor-pointer p-2 text-center text-lg font-bold bg-white shadow rounded mb-2"
            >
              {item.letter.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Vocales cerradas */}
        <div
          onDragOver={draggingOver}
          onDrop={(e) => onDrop(e, 2)}
          className="bg-blue-100 p-4 rounded min-h-[150px]"
        >
          <h2 className="text-center font-semibold text-blue-800 mb-2">
            Vocales Cerradas (I, U)
          </h2>
          {getList(2).map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => startDrag(e, item)}
              className="cursor-pointer p-2 text-center text-lg font-bold bg-white shadow rounded mb-2"
            >
              {item.letter.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={resetGame}
          className="bg-gray-300 text-black px-6 py-3 rounded text-lg font-medium hover:bg-gray-400"
        >
          Reiniciar
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center shadow-xl max-w-sm w-full">
            <h2 className="text-2xl font-bold text-green-600">¡Correcto!</h2>
            <p className="mt-2 text-gray-700">
              Has clasificado todas las letras correctamente.
            </p>
            <button
              onClick={onGoHome}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
