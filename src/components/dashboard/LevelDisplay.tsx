'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getTotalPointsFromDB } from '@/services/points.service';

const getLevelFromPoints = (points: number) => {
  if (points >= 5000) return { level: 5, title: 'Leyenda', nextLevelPoints: 5000 };
  if (points >= 4000) return { level: 4, title: 'Maestro', nextLevelPoints: 5000 };
  if (points >= 3000) return { level: 3, title: 'Avanzado', nextLevelPoints: 4000 };
  if (points >= 2000) return { level: 2, title: 'Intermedio', nextLevelPoints: 3000 };
  if (points >= 1850) return { level: 1, title: 'Principiante', nextLevelPoints: 2000 };
  return { level: 0, title: 'Sin nivel', nextLevelPoints: 1850 };
};

const LevelDisplay = () => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalPoints = async () => {
      try {
        setLoading(true);
        const points = await getTotalPointsFromDB();
        setTotalPoints(points);
        setError(null);
      } catch (error) {
        console.error('Error al obtener los puntos totales:', error);
        setError('No se pudieron cargar los puntos');
      } finally {
        setLoading(false);
      }
    };

    fetchTotalPoints();
  }, []);

  const { level, title, nextLevelPoints } = getLevelFromPoints(totalPoints);
  const progressPercentage = ((totalPoints % 250) / 250) * 100;

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-yellow-200 via-pink-100 to-indigo-100 rounded-2xl p-6 shadow-md flex flex-col items-center justify-center text-center space-y-4">
        <div className="animate-pulse">
          <div className="h-10 w-10 bg-yellow-300 rounded-full mb-4"></div>
          <div className="h-6 w-24 bg-indigo-200 rounded mb-2"></div>
          <div className="h-4 w-32 bg-indigo-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-100 via-pink-100 to-indigo-100 rounded-2xl p-6 shadow-md flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

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
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="text-sm text-gray-500">
        <p>Puntos totales: <span className="font-bold text-indigo-700">{totalPoints}</span></p>
        {level < 5 && (
          <p className="text-xs mt-1">
            Siguiente nivel: {nextLevelPoints} puntos
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default LevelDisplay;
