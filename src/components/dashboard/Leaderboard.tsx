// components/dashboard/Leaderboard.tsx
'use client'

import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSessionFromServer } from '@/lib/auth/getSessionAction';
import { prisma } from '@/lib/prisma';

interface SessionData {
  id: string;
  role: 'STUDENT' | 'TEACHER';
  name: string;
  email: string;
  ranking?: {
    position: number;
    totalScore: number;
  };
}

interface RankingEntry {
  userId: string;
  username: string;
  name: string;
  totalScore: number;
  position: number;
  isTeacher?: boolean;
}

const Leaderboard = () => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [globalRanking, setGlobalRanking] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const sessionData = await getSessionFromServer();
        setSession(sessionData);

        // Si es profesor, obtener el ranking global
        if (sessionData?.role === 'TEACHER') {
          const response = await fetch('/api/ratings/global-ranking', {
            method: 'GET',
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Error al obtener el ranking global');
          }

          const data = await response.json();
          setGlobalRanking(data.ranking);
        }

        setError(null);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setError('No se pudieron cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !session?.ranking) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <p className="text-red-600">{error || 'No hay datos de ranking disponibles'}</p>
      </div>
    );
  }

  // Vista para estudiantes
  if (session.role === 'STUDENT') {
    const { position, totalScore } = session.ranking;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-md"
      >
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-xl font-bold text-gray-800">Tu Ranking</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-3">
              <span className="font-bold text-yellow-600">#{position}</span>
              <span className="font-medium text-gray-700">{session.name}</span>
            </div>
            <span className="font-semibold text-indigo-600">
              {totalScore} pts
            </span>
          </div>

          <div className="text-sm text-gray-500 mt-4">
            <p className="text-center">
              {position === 1 
                ? '¡Eres el número 1! 🏆' 
                : `Te faltan ${Math.max(0, totalScore - (position > 1 ? totalScore : 0))} puntos para subir de posición`}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Vista para profesores
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-md overflow-y-auto max-h-[350px]"
    >
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-gray-800">Ranking Global</h2>
      </div>

      <div className="space-y-3">
        {globalRanking.map((entry, index) => (
          <div
            key={entry.userId}
            className={`flex items-center justify-between p-3 rounded-lg ${
              entry.isTeacher
                ? 'bg-blue-50 border-2 border-blue-300'
                : index === 0
                ? 'bg-yellow-50 border border-yellow-200'
                : index === 1
                ? 'bg-gray-50 border border-gray-200'
                : index === 2
                ? 'bg-orange-50 border border-orange-200'
                : 'bg-white border border-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-bold ${
                entry.isTeacher
                  ? 'text-blue-600'
                  : index === 0
                  ? 'text-yellow-500'
                  : index === 1
                  ? 'text-gray-500'
                  : index === 2
                  ? 'text-orange-500'
                  : 'text-gray-400'
              }`}>
                #{entry.position}
              </span>
              <span className="font-medium text-gray-700">
                {entry.name || entry.username}
                {entry.isTeacher && ' (Tú)'}
              </span>
            </div>
            <span className="font-semibold text-indigo-600">
              {entry.totalScore} pts
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Leaderboard;
