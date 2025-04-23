"use client"
import TemarioCard from '@/components/temario/TemarioCard';
import React, { useEffect, useRef, useState } from 'react'

const temario = [
  {
    id: 1,
    bgColor: "#325afa",
    titulo: 'Lee, comprende y escribe',
    subtemarios: [
      { route: "abecedario", titulo: 'Abecedario', descripcion: "Aprende cada letra del abecedario con juegos y diversión.", imagen: '/unit1/consonante.jpg', locked: false  },
      // { route: "vocales", titulo: 'Vocales y Dígrafos', descripcion: "Aprende cada letra del abecedario con juegos y diversión.", imagen: '/unit1/consonante.jpg' },
      { route: "mayusculas", titulo: 'Letra minúscula y letra mayúscula', descripcion: "Descubre cuándo usar mayúsculas y minúsculas correctamente.", imagen: '/unit1/minYMa.jpg', locked: false  },
      { route: "silaba", titulo: 'Las silabas', descripcion: "Separa y une sílabas para formar palabras con ritmo.", imagen: '/unit1/silabas.jpg', locked: true  },
      { route: 'oracion', titulo: 'La oración', descripcion: "Aprende a formar oraciones completas y con sentido.", imagen: '/unit1/vocales.jpg', locked: true  },
      { route: 'partes-oracion', titulo: 'Partes de una oración', descripcion: "Identifica sujeto, verbo y complemento como un experto.", imagen: '/unit1/gameWord.jpg', locked: true  },
    ],
  },
];


const Games = () => {

  const [currentTitle, setCurrentTitle] = useState('');
  const [idTitle, setidTitle] = useState(1)
  const [bgColor, setBgColor] = useState("#325afa")
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const title = entry.target.getAttribute('data-title');
            const idTitle = entry.target.getAttribute('data-id');
            const bgColor = entry.target.getAttribute('data-bgColor');
            setCurrentTitle(title);
            setidTitle(idTitle)
            setBgColor(bgColor)
          }
        });
      },
      {
        threshold: 0.6, // Cuando el 50% del card sea visible
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });
    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className="px-20 pb-10 w-full  bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9]">
      <div className="flex flex-col fixed z-20 ">
        <div className="bg-gradient-to-r w-full from-[#b1f9fd] via-[#d1fbfd] to-[#F0FAFA] h-10 z-20"></div>
        <div
          style={{ backgroundColor: bgColor }}
          className={`p-6 rounded-lg shadow-lg w-full `}
        >
          <div className="flex top-4 left-4 items-center">
            <button
              onClick={() => window.history.back()}
              style={{ backgroundColor: bgColor, borderColor: bgColor }}
              className={`btn bg-blue`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold bg-clip-text ml-4 text-gray-200">
              Sección # {idTitle}
            </h2>
          </div>
          <h1 className="text-3xl font-bold text-gray-50 mt-4">
            {currentTitle ? currentTitle : "Desplázate para ver más"}
          </h1>
        </div>
      </div>

      <div className="min-h-screen p-6 pt-56">
        {temario.map((section, index) => (
          <div
            key={index}
            id={section.index}
            ref={(el) => (sectionRefs.current[index] = el)}
            data-title={section.titulo} // Añadir atributo data-title para identificar el título
            data-id={section.id}
            data-bgColor={section.bgColor}
          >
            <TemarioCard
              titulo={section.titulo}
              subtemarios={section.subtemarios}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games
