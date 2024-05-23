import React from 'react'
import Subtemarios from './Subtemarios';

const TemarioCard = ({ titulo, subtemarios }:any) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{titulo}</h2>
      <div className="flex flex-wrap gap-4">
        {subtemarios.map((subtemario:any) => (
          <Subtemarios key={subtemario.titulo} titulo={subtemario.titulo} imagen={subtemario.imagen} />
        ))}
      </div>
    </div>
  );
};

export default TemarioCard
