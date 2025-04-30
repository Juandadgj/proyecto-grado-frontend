"use client";

import React from "react";
import { Rating } from "./ui/rating";

interface GameCompleteModalProps {
  onNextGame?: () => void;
  onGoHome: () => void;
  rating: number;
}

const GameCompleteModal = ({
  onNextGame,
  onGoHome,
  rating,
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
          {/* <p className="text-xl font-semibold text-gray-900">
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
          </p> */}
        </div>

        <div className={`flex ${onNextGame == null ? 'justify-center' : 'justify-between'} mt-6`}>
          
          <button
            className="btn btn-outline"
            onClick={() => {
              (document.getElementById(
                "game_complete_modal"
              ) as HTMLDialogElement)?.close();
              onGoHome();
            }}
          >
            Volver al inicio
          </button>
          {onNextGame && <button
            className="btn bg-green-600 text-white hover:bg-green-700"
            onClick={() => {
              (document.getElementById(
                "game_complete_modal"
              ) as HTMLDialogElement)?.close();
              onNextGame();
            }}
          >
            Siguiente juego
          </button>}
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>cerrar</button>
      </form>
    </dialog>
  );
};

export default GameCompleteModal;
