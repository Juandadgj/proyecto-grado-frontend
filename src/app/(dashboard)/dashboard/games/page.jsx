import TemarioCard from '@/components/temario/TemarioCard';
import React from 'react'

const temario = [
  {
    titulo: 'Introducción al Lenguaje de Señas Español (LSE)',
    subtemarios: [
      { titulo: 'Aprender los saludos básicos', imagen: '/images/saludos.jpg' },
      { titulo: 'Presentarse (nombre, edad)', imagen: '/images/presentarse.jpg' },
      { titulo: 'Señas para expresiones cotidianas (por favor, gracias, perdón)', imagen: '/images/expresiones.jpg' },
    ],
  },
  {
    titulo: 'Alfabeto y Números',
    subtemarios: [
      { titulo: 'Aprender las señas del alfabeto', imagen: '/images/alfabeto.jpg' },
      { titulo: 'Correspondencia entre letras y señas', imagen: '/images/letras.jpg' },
      { titulo: 'Señas de los números del 1 al 20', imagen: '/images/numeros1_20.jpg' },
      { titulo: 'Números escritos y su correspondencia en señas', imagen: '/images/numeros_escritos.jpg' },
    ],
  },
  {
    titulo: 'Vocabulario Básico',
    subtemarios: [
      { titulo: 'Palabras y señas para miembros de la familia', imagen: '/images/familia.jpg' },
      { titulo: 'Nombres y señas de los colores básicos', imagen: '/images/colores.jpg' },
      { titulo: 'Vocabulario de animales comunes y sus señas correspondientes', imagen: '/images/animales.jpg' },
      { titulo: 'Vocabulario de objetos del hogar, la escuela y la comunidad', imagen: '/images/objetos.jpg' },
    ],
  },
  {
    titulo: 'Frases Cotidianas',
    subtemarios: [
      { titulo: 'Aprender frases simples para situaciones diarias', imagen: '/images/frases_simples.jpg' },
      { titulo: 'Ejercicios de práctica con ilustraciones y señas', imagen: '/images/ejercicios.jpg' },
    ],
  },
  {
    titulo: 'Gramática Básica',
    subtemarios: [
      { titulo: 'Yo, tú, él/ella, nosotros, vosotros, ellos/ellas', imagen: '/images/pronombres.jpg' },
      { titulo: 'Ser, estar, tener, hacer', imagen: '/images/verbos.jpg' },
      { titulo: 'Conjugaciones básicas en presente', imagen: '/images/conjugaciones.jpg' },
      { titulo: 'Formación de oraciones simples (Sujeto + Verbo + Objeto)', imagen: '/images/oraciones.jpg' },
      { titulo: 'Práctica con ejemplos visuales', imagen: '/images/ejemplos_visuales.jpg' },
    ],
  },
  {
    titulo: 'Comprensión y Expresión',
    subtemarios: [
      { titulo: 'Uso de imágenes y señas para contar historias simples', imagen: '/images/historias.jpg' },
      { titulo: 'Ejercicios de comprensión lectora con apoyo visual', imagen: '/images/comprension.jpg' },
      { titulo: 'Escribir oraciones simples y realizar las señas correspondientes', imagen: '/images/escribir.jpg' },
      { titulo: 'Describir imágenes usando lenguaje escrito y de señas', imagen: '/images/describir.jpg' },
    ],
  },
  {
    titulo: 'Juegos y Actividades Lúdicas',
    subtemarios: [
      { titulo: 'Juegos de memoria con tarjetas de vocabulario', imagen: '/images/memoria.jpg' },
      { titulo: 'Actividades de emparejamiento de señas con palabras escritas', imagen: '/images/emparejamiento.jpg' },
      { titulo: 'Canciones y rimas adaptadas con señas', imagen: '/images/canciones.jpg' },
    ],
  },
  {
    titulo: 'Cultura Sorda y Comunidad',
    subtemarios: [
      { titulo: 'Introducción a la comunidad sorda y su cultura', imagen: '/images/comunidad.jpg' },
      { titulo: 'Importancia del respeto y la inclusión', imagen: '/images/respecto.jpg' },
      { titulo: 'Historias de figuras importantes de la comunidad sorda', imagen: '/images/figuras.jpg' },
    ],
  },
];


const Games = () => {
  return (
    <div className='px-20 py-10 w-full'>
      <div className="p-6 bg-white rounded-lg shadow-lg w-[700px]">
        <div className="flex top-4 left-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
          <h2 className="text-xl font-bold bg-clip-text ml-4 text-gray-400">
            Título Semidegradado
          </h2>
        </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Título Más Grande
          </h1>
      </div>

      <div className="min-h-screen p-6">
      {temario.map((section) => (
        <TemarioCard key={section.titulo} titulo={section.titulo} subtemarios={section.subtemarios} />
      ))}
    </div>
    </div>
  )
}

export default Games
