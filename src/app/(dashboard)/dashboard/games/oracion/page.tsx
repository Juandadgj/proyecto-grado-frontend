import CompleteWordsGame from '@/components/games/temario1/CompleteWordsGame/CompleteWordsGame'
import React from 'react'

const page = () => {
  return (
    <div className="px-6 py-10 min-h-screen w-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9] flex flex-col items-center">
      <div className='bg-white/80 rounded-xl shadow-md p-4 mb-6'>
        <CompleteWordsGame />
      </div>
    </div>
  )
}

export default page
