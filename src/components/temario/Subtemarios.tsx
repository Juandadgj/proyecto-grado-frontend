import Link from 'next/link';
import React from 'react'

const Subtemarios = ({ titulo, imagen, id }:any) => {

  return (
    <Link className='bg-white shadow-lg overflow-hidden rounded-full transform hover:scale-105 transition-transform duration-300 w-40' href={`/dashboard/games/levels`}>
    <div className="relative">
      <img src={imagen} alt={titulo} className="w-full h-full object-cover" />
      <div className="p-0 absolute z-50">
        <h3 className="text-sm  font-bold text-gray-800">{titulo}</h3>
      </div>
    </div>
    </Link>

  );
};

export default Subtemarios
