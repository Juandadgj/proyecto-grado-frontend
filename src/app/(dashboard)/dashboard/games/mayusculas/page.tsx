"use client"
import React, { useState } from 'react'
import AnimalBySize from '@/components/games/temario1/game2/AnimalBySize'
import DragAndDrop from '@/components/games/temario1/game7/DragAndFrop'
import { useRouter } from 'next/navigation'
import AbcGame from '@/components/games/temario1/game1/AbcGame'

const Page = () => {
  const router = useRouter()
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0);

  const handleNext = () => setStep(prev => prev + 1);
  const handleGoHome = () => {
    router.push('/dashboard/games')
    console.log('Volviendo al inicio...')
  };

  return (
    <div className="px-6 py-10 min-h-screen w-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9] flex flex-col items-center">
      <div className='bg-white/80 rounded-xl shadow-md p-4 mb-6'>
        {step === 1 && (
          <AbcGame
            score={score}
            setScore={setScore}
            onNextGame={handleNext}
            onGoHome={handleGoHome}
          />
        )}
        {step === 2 && (
          <AnimalBySize
            score={score}
            setWhatGame={() => {}}
            whatGame={step}
            onNextGame={handleGoHome}
          />
        )}
        
      </div>
    </div>
  )
}

export default Page
