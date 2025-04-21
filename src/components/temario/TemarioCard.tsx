import React from 'react';
import Link from 'next/link';
import './temarioCard.css'; // Asegúrate de tener este archivo en el mismo directorio o ajusta la ruta

const TemarioCard = ({ subtemarios }: any) => {
  return (
    <div className="timeline">
  <div className="outer">
    {subtemarios.map((subtemario: any, index: number) => (
      <div className="card" key={index}>
        {/* Botón con imagen */}
        <Link href={`/dashboard/games/${subtemario.route}`}>
          <div className="dot-button">
            <img
              src={subtemario.imagen}
              alt={subtemario.titulo}
              className="dot-image"
            />
          </div>
        </Link>

        {/* Card informativa (visible solo en hover del card) */}
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
