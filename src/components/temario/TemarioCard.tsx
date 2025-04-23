import React from 'react';
import Link from 'next/link';
import './temarioCard.css';

const TemarioCard = ({ subtemarios }: any) => {
  return (
    <div className="timeline">
      <div className="outer ">
        {subtemarios.map((subtemario: any, index: number) => (
          <div className="card relative" key={index}>
            {subtemario.locked ? (
              <div className="dot-button cursor-not-allowed opacity-100">
                <img
                  src={subtemario.imagen}
                  alt={subtemario.titulo}
                  className="dot-image"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>

                </div>
              </div>
            ) : (
              <Link href={`/dashboard/games/${subtemario.route}`}>
                <div className="dot-button">
                  <img
                    src={subtemario.imagen}
                    alt={subtemario.titulo}
                    className="dot-image"
                  />
                </div>
              </Link>
            )}

            <div className="info">
              <h3 className="title">{subtemario.titulo}</h3>
              <p className="text-gray-300">{subtemario.descripcion || 'Sin descripción disponible.'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemarioCard;
