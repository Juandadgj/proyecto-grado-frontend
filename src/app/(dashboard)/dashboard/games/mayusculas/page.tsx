"use client"
import React, { useState, useEffect } from 'react'
import AnimalBySize from '@/components/games/temario1/game2/AnimalBySize'
import { useRouter } from 'next/navigation'
import AbcGame from '@/components/games/temario1/game1/AbcGame'
import { savePoints, getPoints } from '@/services/points.service'
import { Rating } from '@/components/ui/rating'
import GameCompleteModal from '@/components/GameCompleteModal'

const calculateFirstGamePoints = (correctPairs: number, attempts: number): number => {
  const basePoints = correctPairs * 100; // 100 puntos por pareja correcta
  const penalty = attempts * 5; // 5 puntos de penalización por intento
  return Math.max(0, basePoints - penalty); // No puede ser negativo
};

const calculateSecondGamePoints = (correctWords: number, attempts: number): number => {
  const basePoints = correctWords * 50; // 50 puntos por palabra correcta
  const penalty = attempts * 5; // 5 puntos de penalización por intento
  return Math.max(0, basePoints - penalty); // No puede ser negativo
};

const Page = () => {
  const router = useRouter()
  const [step, setStep] = useState(1);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentGamePoints, setCurrentGamePoints] = useState(0);
  const [currentGameAttempts, setCurrentGameAttempts] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [game1Attempts, setGame1Attempts] = useState(0);
  const [game2Attempts, setGame2Attempts] = useState(0);
  const [game1Completed, setGame1Completed] = useState(false);
  const [game2Completed, setGame2Completed] = useState(false);

  // Función para guardar puntos y actualizar el total
  const saveGamePoints = async (gameId: string, points: number, attempts: number) => {
    try {
      const updatedPoints = await savePoints(gameId, points, attempts, true);
      setTotalPoints(updatedPoints.totalPoints);
      setCurrentGamePoints(points);
      setCurrentGameAttempts(attempts);
      setShowModal(true);
    } catch (error) {
      console.error('Error al guardar los puntos:', error);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
      setGame1Attempts(0);
      setGame1Completed(false);
      (document.getElementById("game_complete_modal") as HTMLDialogElement)?.close();
    }
  };

  const handleGoHome = () => {
    router.push('/dashboard/games');
  };

  const handleFirstGameComplete = async (correctPairs: number, attempts: number) => {
    if (!game1Completed) {
      setGame1Completed(true);
      const points = calculateFirstGamePoints(correctPairs, attempts);
      await saveGamePoints('mayusculas_game1', points, attempts);
    }
  };
  

  const handleSecondGameComplete = async (correctWords: number, attempts: number) => {
    if (!game2Completed) {
      setGame2Completed(true);
      const points = calculateSecondGamePoints(correctWords, attempts);
      await saveGamePoints('mayusculas_game2', points, attempts);
    }
  };

  useEffect(() => {
    const alreadyReloaded = localStorage.getItem('pageReloaded');

  if (!alreadyReloaded) {
    localStorage.setItem('pageReloaded', 'true');
    window.location.reload();
  } else {
    localStorage.removeItem('pageReloaded');
  }
    const points = getPoints();
    setTotalPoints(points.totalPoints);
    // Reiniciar el estado inicial
    setGame1Attempts(0);
    setGame2Attempts(0);
    setGame1Completed(false);
    setGame2Completed(false);
  }, []);

  return (
    <div className="px-6 py-10 min-h-screen w-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9] flex flex-col items-center">
      <div className='bg-white/80 rounded-xl shadow-md p-4 mb-6 w-full max-w-4xl'>

        {step === 1 && (
          <AbcGame
            onComplete={(correctPairs:any, attempts:any) => {
              setGame1Attempts(attempts);
              handleFirstGameComplete(correctPairs, attempts);
            }}
            onNextGame={handleNext}
            onGoHome={handleGoHome}
          />
        )}
        {step === 2 && (
          <AnimalBySize
            onComplete={(correctWords:any, attempts:any) => {
              setGame2Attempts(attempts);
              handleSecondGameComplete(correctWords, attempts);
            }}
            setWhatGame={() => {}}
            whatGame={step}
            onNextGame={handleGoHome}
          />
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
  )
}

export default Page
