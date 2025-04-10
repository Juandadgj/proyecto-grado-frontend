'use client'

import React from 'react';

interface GameCompleteModalProps {
  onNextGame: () => void;
  onGoHome: () => void;
}

const GameCompleteModal = ({ onNextGame, onGoHome }: GameCompleteModalProps) => {
  return (
    <dialog id="game_complete_modal" className="modal">
      <div className="modal-box text-center bg-white">
        <h3 className="font-bold text-2xl text-green-600 mb-2">¡Felicidades! 🎉</h3>
        <p className="text-md text-gray-700 mb-6">
          Has completado todos los juegos correctamente.
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="btn bg-green-600 text-white hover:bg-green-700"
            onClick={() => {
              (document.getElementById('game_complete_modal') as HTMLDialogElement)?.close();
              onNextGame();
            }}
          >
            Siguiente juego
          </button>
          <button
            className="btn btn-outline"
            onClick={() => {
              (document.getElementById('game_complete_modal') as HTMLDialogElement)?.close();
              onGoHome();
            }}
          >
            Volver al inicio
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>cerrar</button>
      </form>
    </dialog>
  );
};

export default GameCompleteModal;
