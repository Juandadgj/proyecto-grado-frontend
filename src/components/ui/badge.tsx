// src/components/ui/badge.tsx
import React from 'react';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

const badgeStyles = {
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-gray-300 text-gray-800',
  outline: 'border border-gray-300 text-gray-800 bg-transparent',
};

export const Badge: React.FC<BadgeProps> = ({ variant = 'primary', children }) => {
  return (
    <span className={`inline-flex items-center justify-center px-2 py-1 text-sm font-medium rounded ${badgeStyles[variant]}`}>
      {children}
    </span>
  );
};
