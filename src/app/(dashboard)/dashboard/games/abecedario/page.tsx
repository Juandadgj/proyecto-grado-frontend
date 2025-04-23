"use client"
import AlphabetGridGame from '@/components/games/temario1/AlphabetGridGame/AlphabetGridGame'
import AlphabetSortGame from '@/components/games/temario1/AlphabetSortGame/AlphabetSortGame'
import React, { useState } from 'react'
import DragAndDrop from '@/components/games/temario1/game7/DragAndFrop';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [alphabetFinished, setAlphabetFinished] = useState(false);

  const handleNext = () => setStep(prev => prev + 1)
  const handleGoHome = () => {
    // Aquí podrías redirigir con router.push('/') si usas Next.js router
    router.push('/dashboard/games')
  }

  return (
    <div className="px-6 py-10 min-h-screen w-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9] flex flex-col items-center">
      <div className='bg-white/80 rounded-xl shadow-md p-4 mb-6'>
      {step === 1 && (<AlphabetSortGame onNextGame={handleNext} onGoHome={handleGoHome}/>)}
        {step === 2 && <AlphabetGridGame onNextGame={handleNext}/>}
        
        {step === 3 && (
          <DragAndDrop
          onGoHome={handleGoHome}
          />
        )}
      </div>
    </div>
  )
}

export default page
