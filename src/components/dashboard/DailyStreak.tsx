// components/dashboard/DailyStreak.tsx
'use client'
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const DailyStreak = ({ streakCount }: { streakCount: number }) => {
  return (
    <motion.div
      className="rounded-2xl bg-orange-100 border-2 border-orange-300 p-4 flex items-center gap-4 shadow-md"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-orange-400 text-white p-3 rounded-full">
        <Flame size={32} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-orange-700">¡Racha diaria!</h2>
        <p className="text-sm text-orange-600">Llevas <span className="font-semibold">{streakCount}</span> días seguidos aprendiendo</p>
      </div>
    </motion.div>
  );
};

export default DailyStreak;
