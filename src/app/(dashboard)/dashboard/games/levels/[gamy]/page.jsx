"use client"
import React, { useState } from 'react'
import AbcGame from '../../../../../../components/games/temario1/game1/AbcGame'
import AnimalBySize from '../../../../../../components/games/temario1/game2/AnimalBySize'
import AnimalByColor from '../../../../../../components/games/temario1/game3/AnimalByColor'

const page = ({params}) => {
  const [whatGame, setWhatGame] = useState("MEMORY")

  return (
    <div className='px-20 py-10 w-full h-full bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9]'>
      {params.gamy === '01' ? (
        whatGame === 'MEMORY' ? (
          <AbcGame setWhatGame={setWhatGame} />
        ) : whatGame === 'ANIMAL_BY_SIZE' ? (
          <AnimalBySize setWhatGame={setWhatGame} />
        ) : (
          <AnimalByColor setWhatGame={setWhatGame}/>
        )
      ) : params.gamy === '02' ? (
        <AnimalBySize />
      ) : params.gamy === '03' ? (
        <AnimalByColor />
      ): null}
    </div>

  )
}

export default page