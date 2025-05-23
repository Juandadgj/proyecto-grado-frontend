"use client";

import React from "react";
import { Rating } from "./ui/rating";

interface GameCompleteModalProps {
  onNextGame?: () => void;
  onGoHome: () => void;
  rating: number;
  showNextButton?: boolean;
  points?: number;
}

const GameCompleteModal = ({
  onNextGame,
  onGoHome,
  rating,
  showNextButton = true,
  points = 0,
}: GameCompleteModalProps) => {
  return (
    <dialog id="game_complete_modal" className="modal">
      <div className="modal-box text-center bg-white">
        <h3 className="font-bold text-2xl text-green-600 mb-2">
          ¡Felicidades! 🎉
        </h3>
        <p className="text-md text-gray-700">Has completado el juego</p>
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900">
            Intentos realizados: <span className="text-blue-500">{rating}</span>
          </p>
          <Rating score={rating} />
          {points > 0 && (
            <p className="text-xl font-semibold text-gray-900 mt-2">
              Puntos obtenidos: <span className="text-green-500">{points}</span>
            </p>
          )}
        </div>

        <div className="modal-action justify-center mt-6">
          {showNextButton && onNextGame ? (
            <button
              className="btn bg-green-600 text-white hover:bg-green-700"
              onClick={() => {
                (document.getElementById("game_complete_modal") as HTMLDialogElement)?.close();
                onNextGame();
              }}
            >
              Siguiente juego
            </button>
          ) : (
            <button
              className="btn bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => {
                (document.getElementById("game_complete_modal") as HTMLDialogElement)?.close();
                onGoHome();
              }}
            >
              Volver al inicio
            </button>
          )}
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>cerrar</button>
      </form>
    </dialog>
  );
};

export default GameCompleteModal;
