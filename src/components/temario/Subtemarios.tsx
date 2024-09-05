import Link from 'next/link';
import React from 'react'

const Subtemarios = ({ titulo, imagen, id }:any) => {

  return (
    <Link className='bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 w-40' href={`/dashboard/games/${id}`}>
    <div className="">
      <img src={imagen} alt={titulo} className="w-full h-24 object-cover" />
      <div className="p-2">
        <h3 className="text-sm font-bold text-gray-800">{titulo}</h3>
      </div>
    </div>
    </Link>

  );
};

export default Subtemarios
