import React from "react";

interface RatingProps {
  score?: number;
}

export const Rating: React.FC<RatingProps> = ({ score }) => {
  return (
    <div className="flex justify-center items-center text-black text-xl pb-2">
      <p>Puntaje acumulado: {score ?? 0}</p>
    </div>
  );
};
