"use client"
import React, { useState } from 'react'

const CarouselDashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const images = [
    'https://static.vecteezy.com/system/resources/previews/028/242/417/non_2x/international-day-of-sign-languages-a-pair-of-deaf-and-mute-people-using-sign-language-to-communicate-a-man-and-a-woman-with-hearing-impairment-vector.jpg',
    'https://img.freepik.com/vector-gratis/estudiantes-personajes-aprendiendo-espanol-curso-lengua-extranjera_87771-10536.jpg',
    'https://www.aprendemas.com/mx/blog/images/2019/07/espanol_apps.jpeg',
  ];

  const previous = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  const forward = () => {
    if (currentIndex < images.length) {
      console.log("etras")
      setCurrentIndex(currentIndex + 1);
    }
  }
  return (
    <main className="grid  h-[300px]">
      <div className="relative mx-auto max-w-lg overflow-hidden rounded-md bg-gray-100 shadow-xl">
        <div className="absolute right-5 top-5 z-10 rounded-full bg-gray-600 px-2 text-center text-sm text-white">
          {currentIndex}/{images.length}
        </div>

        <button
          onClick={previous}
          className="absolute left-5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-gray-100 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
          </svg>

        </button>

        <button
          onClick={forward}
          className="absolute right-5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-gray-100 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>

        </button>

        <div className="relative h-80" style={{ width: '30rem' }}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute top-0 w-full h-full transition-opacity duration-300 ${currentIndex === index + 1 ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img src={image} alt={`image-${index}`} className="rounded-sm w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default CarouselDashboard