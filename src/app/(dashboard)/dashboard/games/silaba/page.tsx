"use client";
import GameCompleteModal from "@/components/GameCompleteModal";
import { SyllableGame } from "@/components/games/temario1/SyllableGame/SyllableGame";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import zapato from "./assets/zapato.png";
import mochila from "./assets/mochila.jpg";
import tijeras from "./assets/tijeras.jpg";
import { Rating } from "@/components/ui/rating";
import CompleteWordsGame from '@/components/games/temario1/CompleteWordsGame/CompleteWordsGame';
import { savePoints, getPoints } from '@/services/points.service';

const words = [
  { word: "tijeras", imageSrc: tijeras },
  { word: "mochila", imageSrc: mochila },
  { word: "zapato", imageSrc: zapato },
];

const calculateFirstGamePoints = (correctWords: number, attempts: number): number => {
  const basePoints = correctWords * 100; // 100 puntos por palabra correcta
  const penalty = attempts * 10; // 10 puntos de penalización por intento
  return Math.max(0, basePoints - penalty); // No puede ser negativo
};

const calculateSecondGamePoints = (correctWords: number, attempts: number): number => {
  const basePoints = correctWords * 50; // 50 puntos por palabra correcta
  const penalty = attempts * 5; // 5 puntos de penalización por intento
  return Math.max(0, basePoints - penalty); // No puede ser negativo
};

const page = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const [game1Attempts, setGame1Attempts] = useState(0);
  const [game2Attempts, setGame2Attempts] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentGamePoints, setCurrentGamePoints] = useState(0);
  const [currentGameAttempts, setCurrentGameAttempts] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [game1Completed, setGame1Completed] = useState(false);
  const [initialWords, setInitialWords] = useState<string[]>([]);

  // Función para guardar puntos y actualizar el total
  const saveGamePoints = async (gameId: string, points: number, attempts: number) => {
    try {
      const updatedPoints = await savePoints(gameId, points, attempts, true);
      setTotalPoints(updatedPoints.totalPoints);
      setCurrentGamePoints(points);
      setCurrentGameAttempts(attempts);
    } catch (error) {
      console.error('Error al guardar los puntos:', error);
    }
  };

  const handleNext = async () => {
    if (step === 1) {
      // Guardar puntos del primer juego
      const points = calculateFirstGamePoints(
        Object.values(progress).filter(Boolean).length,
        game1Attempts
      );
      await saveGamePoints('silaba_game1', points, game1Attempts);
      setStep(2);
      setGame1Attempts(0); // Reiniciar intentos al cambiar de juego
      setGame1Completed(false);
      (document.getElementById("game_complete_modal") as HTMLDialogElement)?.close();
    }
  };

  const handleGoHome = () => {
    router.push("/dashboard/games");
  };

  const handleSolved = (word: string, correct: boolean) => {
    // Si es la primera vez que se resuelve una palabra, inicializar el estado
    if (!isInitialized) {
      setIsInitialized(true);
      setInitialWords(words.map(w => w.word));
    }

    setProgress((prev) => {
      const newProgress = { ...prev, [word]: correct };
      if (!correct) {
        setGame1Attempts(prev => prev + 1);
      }
      return newProgress;
    });
  };

  useEffect(() => {
    const correctCount = Object.values(progress).filter(Boolean).length;
    const allWordsAttempted = initialWords.every(word => progress[word] !== undefined);
    
    if (allWordsAttempted && correctCount === words.length && step === 1 && !game1Completed) {
      setGame1Completed(true);
      const points = calculateFirstGamePoints(correctCount, game1Attempts);
      saveGamePoints('silaba_game1', points, game1Attempts);
      (document.getElementById("game_complete_modal") as HTMLDialogElement)?.showModal();
    }
  }, [progress, step, game1Attempts, game1Completed, initialWords]);

  const handleCompleteSecondGame = async (correctWords: number, attempts: number) => {
    const points = calculateSecondGamePoints(correctWords, attempts);
    await saveGamePoints('silaba_game2', points, attempts);
    (document.getElementById("game_complete_modal") as HTMLDialogElement)?.showModal();
  };

  useEffect(() => {
    // Cargar puntos totales al iniciar
    const points = getPoints();
    setTotalPoints(points.totalPoints);
    // Reiniciar el estado inicial
    setGame1Attempts(0);
    setGame2Attempts(0);
    setProgress({});
    setIsInitialized(false);
    setGame1Completed(false);
    setInitialWords([]);
  }, []);

  return (
    <div className="px-4 sm:px-6 py-8 sm:py-10 min-h-screen w-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9] flex flex-col items-center">
      <div className="bg-white/90 rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-6xl flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <Rating 
              score={game1Attempts} 
              label="Intentos Juego 1" 
              variant={game1Attempts > 15 ? 'error' : game1Attempts > 10 ? 'warning' : 'default'}
            />
            {step === 2 && (
              <Rating 
                score={game2Attempts} 
                label="Intentos Juego 2" 
                variant={game2Attempts > 15 ? 'error' : game2Attempts > 10 ? 'warning' : 'default'}
              />
            )}
          </div>
        </div>

        {step === 1 && (
          <>
            <div className="w-full text-center mb-8 sm:mb-10 px-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
                ¡Juguemos con las sílabas!
              </h1>
              <p className="text-blue-800 text-base sm:text-lg max-w-3xl mx-auto">
                Arrastra las sílabas al orden correcto para formar la palabra correspondiente a la imagen.
              </p>
            </div>

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
          </>
        )}

        {step === 2 && (
          <div className="w-full">
            <div className="w-full text-center mb-8 sm:mb-10 px-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
                ¡Completemos las palabras!
              </h1>
              <p className="text-blue-800 text-base sm:text-lg max-w-3xl mx-auto">
                Completa las palabras arrastrando las sílabas correctas.
              </p>
            </div>
            <CompleteWordsGame 
              onComplete={(correctWords, attempts) => {
                setGame2Attempts(attempts);
                handleCompleteSecondGame(correctWords, attempts);
              }} 
              onGoHome={handleGoHome}
              showRating={false} // No mostramos el Rating aquí porque ya lo tenemos en la página
            />
          </div>
        )}
      </div>

      <GameCompleteModal
        onNextGame={step === 1 ? handleNext : undefined}
        onGoHome={handleGoHome}
        rating={currentGameAttempts}
        showNextButton={step === 1}
        points={currentGamePoints}
      />
    </div>
  );
};

export default page;
