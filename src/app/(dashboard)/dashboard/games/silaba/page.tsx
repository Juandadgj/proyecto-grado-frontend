'use client'
import GameCompleteModal from '@/components/GameCompleteModal';
import { SyllableGame } from '@/components/games/temario1/SyllableGame/SyllableGame';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import zapato from './assets/zapato.png'
import mochila from './assets/mochila.jpg'
import tijeras from './assets/tijeras.jpg'

const words = [
  { word: 'tijeras', imageSrc: tijeras},
  { word: 'mochila', imageSrc: mochila},
  { word: 'zapato', imageSrc: zapato}
];

const page = () => {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const router = useRouter()

  const handleSolved = (word: string, correct: boolean) => {
    setProgress(prev => ({ ...prev, [word]: correct }));
  };

  useEffect(() => {
    const correctCount = Object.values(progress).filter(Boolean).length
    if (correctCount === words.length) {
      (document.getElementById('game_complete_modal') as HTMLDialogElement)?.showModal()
    }
  }, [progress])

  return (
    <div className="px-6 py-10 min-h-screen w-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9] flex flex-col items-center">
      <div className='bg-white/80 rounded-xl shadow-md p-4 mb-6'>
        <div className="max-w-4xl w-full text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">¡Juguemos con las sílabas!</h1>
          <p className="text-blue-800 text-lg">Arrastra las sílabas al orden correcto para formar la palabra correspondiente a la imagen.</p>
        </div>

        <div className="w-full max-w-4xl space-y-8">
          {words.map(({ word, imageSrc }) => (
            <SyllableGame
              key={word}
              word={word}
              imageSrc={imageSrc}
              onSolved={(correct) => handleSolved(word, correct)}
            />
          ))}
        </div>

        <div className="mt-10 text-center text-blue-900 font-semibold text-lg px-6 py-3">
          Progreso: {Object.values(progress).filter(Boolean).length} / {words.length} completadas correctamente
        </div>
      </div>

      <GameCompleteModal
        onNextGame={() => {
          (document.getElementById('game_complete_modal') as HTMLDialogElement)?.close()
          router.push('/dashboard/games/vocales')
        }}
        onGoHome={() => {
          (document.getElementById('game_complete_modal') as HTMLDialogElement)?.close()
          router.push('/dashboard/games')
        }}
      />
    </div>

  )
}

export default page
