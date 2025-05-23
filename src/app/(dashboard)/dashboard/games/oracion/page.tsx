"use client"
import React, { useState, useEffect } from 'react'
import IdentifySentencePartsGame from '@/components/games/temario1/SentencesGame/SentencesGame'
import { savePoints, getPoints } from '@/services/points.service'
import { Rating } from '@/components/ui/rating'
import GameCompleteModal from '@/components/GameCompleteModal'
import { useRouter } from 'next/navigation'

const calculatePoints = (correctAnswers: number, attempts: number): number => {
  const basePoints = correctAnswers * 50; // 50 puntos por respuesta correcta
  const penalty = attempts * 5; // 5 puntos de penalización por intento
  return Math.max(0, basePoints - penalty); // No puede ser negativo
}

const Page = () => {
  const [totalPoints, setTotalPoints] = useState(0)
  const [currentGamePoints, setCurrentGamePoints] = useState(0)
  const [currentGameAttempts, setCurrentGameAttempts] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [gameAttempts, setGameAttempts] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const router = useRouter()

  // Función para guardar puntos y actualizar el total
  const saveGamePoints = async (points: number, attempts: number) => {
    try {
      const updatedPoints = await savePoints('oracion_game', points, attempts, true)
      setTotalPoints(updatedPoints.totalPoints)
      setCurrentGamePoints(points)
      setCurrentGameAttempts(attempts)
      setShowModal(true)
    } catch (error) {
      console.error('Error al guardar los puntos:', error)
    }
  }

  const handleGameComplete = (correctAnswers: number, attempts: number) => {
    if (!gameCompleted) {
      setGameCompleted(true)
      const points = calculatePoints(correctAnswers, attempts)
      saveGamePoints(points, attempts)
    }
  }

  useEffect(() => {
    // Cargar puntos totales al iniciar
    const points = getPoints()
    setTotalPoints(points.totalPoints)
    // Reiniciar el estado inicial
    setGameAttempts(0)
    setGameCompleted(false)
  }, [])

  return (
    <div className="px-6 py-10 min-h-screen w-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9] flex flex-col items-center">
      <div className='bg-white/80 rounded-xl shadow-md p-4 mb-6 w-full max-w-4xl'>
        <div className="w-full flex justify-between items-center mb-4">
          <div className="flex gap-4">
          </div>
        </div>

        <IdentifySentencePartsGame 
          onComplete={(correctAnswers, attempts) => {
            setGameAttempts(attempts)
            handleGameComplete(correctAnswers, attempts)
          }}
        />
      </div>

      <GameCompleteModal
        onGoHome={() => {
          (document.getElementById("game_complete_modal") as HTMLDialogElement)?.close()
          router.push("/dashboard/games")
        }}
        rating={currentGameAttempts}
        points={currentGamePoints}
      />
    </div>
  )
}

export default Page
