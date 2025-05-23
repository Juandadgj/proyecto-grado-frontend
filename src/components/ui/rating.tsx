import React from "react";

interface RatingProps {
  score?: number;
  label?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Rating: React.FC<RatingProps> = ({ 
  score = 0, 
  label = "Intentos", 
  variant = 'default' 
}) => {

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className={`inline-flex items-center px-4 py-2 rounded-full border ${getVariantStyles()} shadow-sm`}>
      <svg 
        className="w-5 h-5 mr-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span className="font-semibold">{label}:</span>
      <span className="ml-2 font-bold">{score}</span>
    </div>
  );
};
