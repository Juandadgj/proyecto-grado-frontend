import React from 'react'
import SentencesGame from '@/components/games/temario1/SentencesGame/SentencesGame'

const page = () => {
  return (
    <div className="px-6 py-10 min-h-screen w-full overflow-auto bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9] flex justify-center items-center">
      <div className='bg-white rounded-xl w-full max-w-lg h-[500px] shadow-md p-4 mb-6 content-center'>
        <SentencesGame />
      </div>
    </div>
  )
}

export default page