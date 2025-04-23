"use client";
import GameCompleteModal from "@/components/GameCompleteModal";
import { SyllableGame } from "@/components/games/temario1/SyllableGame/SyllableGame";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import zapato from "./assets/zapato.png";
import mochila from "./assets/mochila.jpg";
import tijeras from "./assets/tijeras.jpg";
import { Rating } from "@/components/ui/rating";

const words = [
  { word: "tijeras", imageSrc: tijeras },
  { word: "mochila", imageSrc: mochila },
  { word: "zapato", imageSrc: zapato },
];

const page = () => {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const [turns, setTurns] = useState(0);

  const handleNext = () => setTurns((prev) => prev + 1);
  const handleGoHome = () => {
    console.log("Volviendo al inicio...");
  };

  const handleSolved = (word: string, correct: boolean) => {
    setProgress((prev) => ({ ...prev, [word]: correct }));
  };

  useEffect(() => {
    const correctCount = Object.values(progress).filter(Boolean).length;
    if (correctCount === words.length) {
      (document.getElementById("game_complete_modal") as HTMLDialogElement)?.showModal();
    }
  }, [progress]);

  return (
    <div className="px-4 sm:px-6 py-8 sm:py-10 min-h-screen w-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9] flex flex-col items-center">
      <div className="bg-white/90 rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-6xl flex flex-col items-center">
        <Rating score={turns} />

        <div className="w-full text-center mb-8 sm:mb-10 px-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
            ¡Juguemos con las sílabas!
          </h1>
          <p className="text-blue-800 text-base sm:text-lg max-w-3xl mx-auto">
            Arrastra las sílabas al orden correcto para formar la palabra correspondiente a la imagen.
          </p>
        </div>

        {/* Cambiado de column layout a grid responsive */}
        <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {words.map(({ word, imageSrc }) => (
            <SyllableGame
              key={word}
              word={word}
              imageSrc={imageSrc}
              onSolved={(correct) => handleSolved(word, correct)}
            />
          ))}
        </div>

        <div className="mt-10 text-center text-blue-900 font-semibold text-base sm:text-lg px-4 py-3 w-full">
          Progreso: {Object.values(progress).filter(Boolean).length} / {words.length} completadas correctamente
        </div>
      </div>

      <GameCompleteModal
        onNextGame={() => {
          (document.getElementById("game_complete_modal") as HTMLDialogElement)?.close();
          router.push("/dashboard/games/");
        }}
        onGoHome={() => {
          (document.getElementById("game_complete_modal") as HTMLDialogElement)?.close();
          router.push("/dashboard/games");
        }}
        rating={turns}
      />
    </div>
  );
};

export default page;
