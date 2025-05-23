"use client"
import AlphabetGridGame from '@/components/games/temario1/AlphabetGridGame/AlphabetGridGame'
import AlphabetSortGame from '@/components/games/temario1/AlphabetSortGame/AlphabetSortGame'
import React, { useState, useEffect } from 'react'
import DragAndDrop from '@/components/games/temario1/game7/DragAndFrop';
import { useRouter } from 'next/navigation';
import { Rating } from "@/components/ui/rating";
import { savePoints, getPoints, getTotalPointsFromDB } from '@/services/points.service';
import GameCompleteModal from "@/components/GameCompleteModal";

// Puntos base por juego
const GAME_POINTS = {
  GAME1: 300, // Ordenar palabras
  GAME2: 400, // Completar abecedario
  GAME3: 300  // Clasificar vocales
};

// Penalización por intento
const ATTEMPT_PENALTY = 10;

const page = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [temarioPoints, setTemarioPoints] = useState(0); // Puntos acumulados en este temario
  const [totalPoints, setTotalPoints] = useState(0); // Puntos totales (localStorage + temario)
  const [currentGamePoints, setCurrentGamePoints] = useState(0);
  const [temarioAttempts, setTemarioAttempts] = useState(0); // Intentos totales del temario
  const [game1Attempts, setGame1Attempts] = useState(0);
  const [game2Attempts, setGame2Attempts] = useState(0);
  const [game3Attempts, setGame3Attempts] = useState(0);
  const [completedGames, setCompletedGames] = useState<Set<number>>(new Set());

  // Función para calcular puntos de un juego específico
  const calculateGamePoints = (basePoints: number, attempts: number): number => {
    const penalty = attempts * ATTEMPT_PENALTY;
    return Math.max(0, basePoints - penalty);
  };

  // Función para actualizar puntos del temario
  const updateTemarioPoints = async (gameNumber: number, attempts: number) => {
    const basePoints = GAME_POINTS[`GAME${gameNumber}` as keyof typeof GAME_POINTS];
    const gamePoints = calculateGamePoints(basePoints, attempts);
    
    setTemarioPoints(prev => prev + gamePoints);
    setCurrentGamePoints(gamePoints);
    setCompletedGames(prev => new Set([...Array.from(prev), gameNumber]));

    // Guardar puntos del juego individual
    try {
      await savePoints(`abecedario_game${gameNumber}`, gamePoints, attempts, true);
    } catch (error) {
      console.error(`Error al guardar puntos del juego ${gameNumber}:`, error);
    }
  };

  const handleNext = async () => {
    if (step === 1) {
      await updateTemarioPoints(1, game1Attempts);
      setStep(2);
      (document.getElementById("game_complete_modal") as HTMLDialogElement)?.close();
    } else if (step === 2) {
      await updateTemarioPoints(2, game2Attempts);
      setStep(3);
      (document.getElementById("game_complete_modal") as HTMLDialogElement)?.close();
    }
  };

  const handleGoHome = async () => {
    // Solo guardar puntos del último juego si no se han guardado antes
    if (!completedGames.has(3)) {
      await updateTemarioPoints(3, game3Attempts);
    }
    router.push("/dashboard/games");
  };

  const handleGame1Complete = async (attempts: number) => {
    if (!completedGames.has(1)) {
      setGame1Attempts(attempts);
      setTemarioAttempts(prev => prev + attempts);
      await updateTemarioPoints(1, attempts);
      (document.getElementById("game_complete_modal") as HTMLDialogElement)?.showModal();
    }
  };

  const handleGame2Complete = async (attempts: number) => {
    if (!completedGames.has(2)) {
      setGame2Attempts(attempts);
      setTemarioAttempts(prev => prev + attempts);
      await updateTemarioPoints(2, attempts);
      (document.getElementById("game_complete_modal") as HTMLDialogElement)?.showModal();
    }
  };

  const handleGame3Complete = async (attempts: number) => {
    if (!completedGames.has(3)) {
      setGame3Attempts(attempts);
      setTemarioAttempts(prev => prev + attempts);
      await updateTemarioPoints(3, attempts);
      (document.getElementById("game_complete_modal") as HTMLDialogElement)?.showModal();
    }
  };

  const fetchTotalPoints = async () => {
    try {
      const points = await getTotalPointsFromDB();
      setTotalPoints(points);
    } catch (error) {
      console.error('Error al obtener los puntos totales:', error);
    }
  };

  useEffect(() => {
    // Cargar puntos totales al iniciar
    const points = getPoints();
    // setTotalPoints(points.totalPoints);
    // Reiniciar estados del temario
    setTemarioPoints(0);
    setTemarioAttempts(0);
    setGame1Attempts(0);
    setGame2Attempts(0);
    setGame3Attempts(0);
    setCompletedGames(new Set());
    fetchTotalPoints();
  }, []);

  return (
    <div className="px-4 sm:px-6 py-8 sm:py-10 min-h-screen w-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9] flex flex-col items-center">
      <div className="bg-white/90 rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-6xl flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <Rating 
              score={temarioAttempts} 
              label="Intentos Totales" 
              variant={temarioAttempts > 45 ? 'error' : temarioAttempts > 30 ? 'warning' : 'default'}
            />
          </div>
        </div>

        {step === 1 && (
          <AlphabetSortGame 
            onNextGame={handleNext} 
            onGoHome={handleGoHome}
            onComplete={handleGame1Complete}
          />
        )}
        
        {step === 2 && (
          <AlphabetGridGame 
            onNextGame={handleNext}
            onComplete={handleGame2Complete}
          />
        )}
        
        {step === 3 && (
          <DragAndDrop
            onGoHome={handleGoHome}
            onComplete={handleGame3Complete}
          />
        )}

        <GameCompleteModal
          onNextGame={step < 3 ? handleNext : undefined}
          onGoHome={handleGoHome}
          rating={temarioAttempts}
          showNextButton={step < 3}
          points={currentGamePoints}
        />
      </div>
    </div>
  );
};

export default page;
