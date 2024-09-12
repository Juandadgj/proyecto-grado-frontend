import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const levels = [
  {
    title: 'Fácil',
    image: '/bby.png',
    route: '/dashboard/games/levels/01' // Asegúrate de tener estas imágenes en el directorio public/images
  },
  {
    title: 'Normal',
    image: '/teen.png',
    route: '/dashboard/games/levels/02'
  },
  {
    title: 'Difícil',
    image: '/juan.png',
    route: '/dashboard/games/levels/03'
  }
];

const Levels = () => {
  return (
    <div className='px-20 py-10 w-full  bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9]'>
      <div className="relative flex justify-between items-center w-[600px] h-[220px] p-6 bg-[#ffb041] rounded-xl shadow-lg">
        <div className="relative flex-shrink-0">
          <h1 className="text-2xl font-bold text-white">¡Bienvenido!</h1>
          <p className='text-lg text-white'>Escoge el nivel que quieras</p>
        </div>
        <Image src="/OIG4.png" width={220} height={210} alt="Welcome" className="object-fill transform hover:scale-x-105 transition-transform duration-300 rounded-lg" />
      </div>

      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold text-gray-800 my-6">Misión Diaria</h1>
        <div className='flex flex-row gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF9600" className="size-8">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
          </svg>

          <h1 className="text-3xl font-normal text-[#FF9600]">12 horas</h1>
        </div>
      </div>

      <div className="flex items-center p-6 bg-white rounded-lg shadow-lg">
        <div className="flex-shrink-0 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD900" className="size-12">
            <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-grow">
          <div className="mb-2">
            <h2 className="text-xl font-bold text-gray-800">Gana 10xp</h2>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-blue-500 h-4 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>

      {/* cartas de niveles */}
      <div className="grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 justify-center items-center">
        {levels.map((level) => (
          <Link href={level.route}>
            <div
              key={level.title}
              className="bg-white cursor-pointer rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col items-center"
            >
              <img
                src={level.image}
                alt={level.title}
                className="w-full h-32 sm:h-48 object-contain"
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-bold text-gray-800">{level.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Levels
