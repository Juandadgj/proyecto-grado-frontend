import React from 'react'
import Link from 'next/link';
import CurvedTimeline from '../CurvedTimeLine';

const TemarioCard = ({ titulo, subtemarios, id }: any) => {
  return (
    <div >
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">{titulo}</h2> */}
      <CurvedTimeline>
        {subtemarios.map((subtemario: any, index: any) => (
          <Link key={index} href={`/dashboard/games/levels`} className="text-center">
            <div className="flex flex-col justify-center items-center"> 
              {/* Contenedor para centrar la imagen y el título */}
              <div className="flex flex-col animate-bounce gap-y-0">
                <div className=" rounded-lg z-20 bg-[#3f65fd] max-w-60 p-2">
                  <h3 className="text-sm font-bold text-gray-800 ">
                    {subtemario.titulo}
                  </h3>
                </div>
                <div className="w-0 h-0 mx-auto border-t-[15px] border-t-[#3f65fd] border-x-[18px] border-x-transparent border-b-0 top-full"></div>
              </div>
              <button className="btn w-32 p-0 h-32 bg-slate-500 rounded-full items-center shadow-lg border-[10px] border-sky-950  transform hover:scale-105 transition-transform duration-300">
                <img
                  src={subtemario.imagen}
                  alt={subtemario.titulo}
                  className="w-full mx-auto rounded-full object-contain"
                />
              </button>
            </div>
          </Link>
        ))}
      </CurvedTimeline>
    </div>
  );
};

export default TemarioCard
