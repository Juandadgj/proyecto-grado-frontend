import React from 'react';

interface CurvedTimelineProps {
  children: React.ReactNode; // Los pasos se pasan como hijos
}

const CurvedTimeline: React.FC<CurvedTimelineProps> = ({ children }) => {
  const stepCount = React.Children.count(children); // Contar el número de pasos

  return (
    <div className="relative w-full h-auto flex flex-col items-center">
      {/* <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="110 -60 500 600" // Cambié la altura para que las curvas sean más notables
        preserveAspectRatio="xMidYMid meet"
      >
        {Array.from({ length: stepCount - 1 }).map((_, index) => (
          <path
            key={index}
            d={generateCurvedPath(index)} // Generar curva entre pasos
            stroke="#D5A87B"
            strokeWidth="18"
            fill="none"
          />
        ))}
      </svg> */}
      <div className="relative z-10 flex flex-col space-y-3 w-[65%]"> {/* Espaciado mayor */}
        {React.Children.map(children, (child, index) => (
          <div className={`w-full flex justify-${index % 2 === 0 ? 'start left-0' : 'end'}`}> {/* Alternar posición de cada paso */}
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

// Función para generar las curvas SVG, alternando entre izquierda y derecha
const generateCurvedPath = (index: number): string => {
  const xStart = index % 2 === 0 ? 150 : 650; // Alternar entre la izquierda y la derecha
  const yStart = index * 200 + 50; // Incrementar la posición en el eje Y
  const xEnd = xStart === 150 ? 650 : 150;
  const yEnd = yStart + 200;

  // Ajustar los puntos de control para hacer la curva más pronunciada
  const controlPointX = (xStart + xEnd) / 2;
  const controlPointY1 = yStart + 150; // Hacer que el primer punto de control esté más lejos
  const controlPointY2 = yEnd - 180;   // Hacer que el segundo punto de control esté más lejos

  // Generar el path con curvas más pronunciadas
  return `M ${xStart},${yStart} C ${controlPointX},${controlPointY1} ${controlPointX},${controlPointY2} ${xEnd},${yEnd}`;
};

export default CurvedTimeline;
