import React from 'react'
import Image from 'next/image'

function SectionHero() {
  return (
    <section className='relative w-full flex flex-row h-[600px] bg-[#00C1FF]'>
      <div className='pt-[60px] pl-32 w-[50vw]'>
        <h1 className='text-white font-extrabold text-6xl'>Embarcate en esta aventura para aprender español</h1>
        <p className='font-extralight mt-4 text-white'>Bienvenido a nuestro innovador software educativo diseñado especialmente para niños con discapacidad auditiva que desean aprender español como segunda lengua. Nuestra plataforma combina recursos visuales, actividades interactivas y tecnologías de la información y comunicación para brindar una experiencia de aprendizaje divertida y efectiva.</p>
      </div>
      <Image
          src="/aa.png"
          alt="Descripción de la imagen"
          width={420}   // Especifica el ancho de la imagen
          height={500}  // Especifica la altura de la imagen
          className='rigth-0 ml-28'
        />
        <Image
          src="/hero.svg"
          alt="Descripción de la imagen"
          width={500}   // Especifica el ancho de la imagen
          height={100}  // Especifica la altura de la imagen
          className='absolute bottom-0 left-0 w-full'
        />
    </section>
  )
}

export default SectionHero
