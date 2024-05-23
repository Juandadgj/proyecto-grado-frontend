import React from 'react'

const Subtemarios = ({ titulo, imagen }:any) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 w-40">
      <img src={imagen} alt={titulo} className="w-full h-24 object-cover" />
      <div className="p-2">
        <h3 className="text-sm font-bold text-gray-800">{titulo}</h3>
      </div>
    </div>
  );
};

export default Subtemarios
