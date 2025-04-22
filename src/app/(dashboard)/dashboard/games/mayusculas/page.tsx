"use client"
import React, { useState } from 'react'
import AbcGame from '@/components/games/temario1/game1/AbcGame'
import AnimalBySize from '@/components/games/temario1/game2/AnimalBySize'
import DragAndDrop from '@/components/games/temario1/game7/DragAndFrop'

const page = () => {
  const [whatGame, setWhatGame] = useState('ABC');
  const [score, setScore] = useState(0);
  return (
    <div className="px-6 py-10 min-h-screen w-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9] flex flex-col items-center">
      <div className='bg-white/80 rounded-xl shadow-md p-4 mb-6'>
        {<AbcGame score={score} setWhatGame={setWhatGame}
          whatGame={whatGame}/>}
        {<AnimalBySize score={score} setWhatGame={setWhatGame}
          whatGame={whatGame}/>}
        {<DragAndDrop/>}
      </div>
    </div>
  )
}

export default page
