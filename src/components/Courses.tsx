import React from 'react'
import CardCourses from './CardCourses';
import Link from 'next/link';

const data = [
  {
    url: "https://img.freepik.com/fotos-premium/concepto-ocio-educacion-ninos-tecnologia-personas-nino-computadora-auriculares-escribiendo-teclado-o-jugando-videojuegos-casa_380164-172190.jpg?w=360",
    title: "6-8 años",
    info: ["Enfoque en el desarrollo de habilidades pre-lingüísticas y conciencia fonológica.", "Introducción a vocabulario básico y expresiones cotidianas.", "Utilización de cuentos, canciones y juegos para estimular el interés."]
  },
  {
    url: "https://img.freepik.com/fotos-premium/nino-trabajando-computadora_320071-240.jpg",
    title: "9-11 años",
    info: ["Enseñanza del alfabeto y sonidos básicos.", "Desarrollo de habilidades de lectura y escritura inicial.", "Expansión del vocabulario y estructuras gramaticales sencillas.", "Incorporación de actividades lúdicas e interactivas."]
  },
  {
    url: "https://img.freepik.com/foto-gratis/amigos-riendo-portatil_1098-2649.jpg?size=626&ext=jpg&ga=GA1.1.1687694167.1714176000&semt=ais",
    title: "12-15 años",
    info: ["Fortalecimiento de la comprensión lectora y expresión escrita.", "Introducción a géneros literarios y tipos de textos.", "Ampliación del vocabulario y estructuras gramaticales más complejas.", "Fomento de la comunicación efectiva en contextos cotidianos."]
  },
];

const Courses = () => {
  return (
    <div  className='bg-white p-24'>
      <div id='courses' className='flex mb-16 flex-row justify-between'>
        <Link href="/login">
          <button className="w-max mx-auto text-[#00C1FF] font-semibold px-10 py-3 rounded-full border-2 border-[#00C1FF] hover:border-[#0066ff]  hover:shadow-xl">Ver más</button>
        </Link >
        <div><h1 className='font-bold text-3xl text-[#212121]'>Encuentra el mejor <span className='text-[#00C1FF]'>camino <br /></span> para aprender español</h1></div>
      </div>
      <div className='flex flex-row space-x-3'>
      {
        data.map( i => (
            <CardCourses url={i.url} title={i.title} info={i.info}/>
          ))
        }
        </div>
    </div>
  )
}

export default Courses