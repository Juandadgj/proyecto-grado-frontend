'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const getLevelFromPoints = (points: number) => {
  if (points >= 1000) return { level: 5, title: 'Leyenda' };
  if (points >= 750) return { level: 4, title: 'Maestro' };
  if (points >= 500) return { level: 3, title: 'Avanzado' };
  if (points >= 250) return { level: 2, title: 'Intermedio' };
  return { level: 1, title: 'Principiante' };
};

const LevelDisplay = ({ totalPoints }: { totalPoints: number }) => {
  const { level, title } = getLevelFromPoints(totalPoints);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-gradient-to-br from-yellow-200 via-pink-100 to-indigo-100 rounded-2xl p-6 shadow-md flex flex-col items-center justify-center text-center space-y-4"
    >
      <Sparkles className="w-10 h-10 text-yellow-500 animate-growShrink" />
      <h2 className="text-2xl font-bold text-indigo-800">¡Nivel {level}!</h2>
      <p className="text-lg text-gray-700 font-semibold italic">{title}</p>
      <div className="w-full bg-white rounded-full h-4 overflow-hidden shadow-inner border">
        <div
          className="h-full bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-500"
          style={{ width: `${(totalPoints % 250) / 250 * 100}%` }}
        />
      </div>
      <p className="text-sm text-gray-500">Puntos totales: <span className="font-bold text-indigo-700">{totalPoints}</span></p>
    </motion.div>
  );
};

export default LevelDisplay;
