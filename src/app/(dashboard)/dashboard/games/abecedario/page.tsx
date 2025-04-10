"use client"
import AlphabetGridGame from '@/components/games/temario1/AlphabetGridGame/AlphabetGridGame'
import AlphabetSortGame from '@/components/games/temario1/AlphabetSortGame/AlphabetSortGame'
import React, { useState } from 'react'

const page = () => {
  const [step, setStep] = useState(1)
  const [alphabetFinished, setAlphabetFinished] = useState(false);

  const handleNext = () => setStep(2)
  const handleGoHome = () => {
    // Aquí podrías redirigir con router.push('/') si usas Next.js router
    console.log('Volviendo al inicio...')
  }

  return (
    <div className="px-6 py-10 min-h-screen w-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9] flex flex-col items-center">
      <div className='bg-white/80 rounded-xl shadow-md p-4 mb-6'>
      {step === 1 && (<AlphabetSortGame onNextGame={handleNext} onGoHome={handleGoHome}/>)}
        {step === 2 && <AlphabetGridGame />}
      </div>
    </div>
  )
}

export default page
