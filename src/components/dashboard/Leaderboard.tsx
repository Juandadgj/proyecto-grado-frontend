// components/dashboard/Leaderboard.tsx
'use client'
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const Leaderboard = ({ ranking }: { ranking: { name: string; score: number }[] }) => {
  return (
    <motion.div
      className="rounded-2xl bg-purple-100 border-2 border-purple-300 p-4 shadow-md"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="text-purple-700" />
        <h2 className="text-xl font-bold text-purple-800">Ranking</h2>
      </div>
      <ul className="space-y-2">
        {ranking.map((player, idx) => (
          <li
            key={idx}
            className={`flex justify-between px-4 py-2 rounded-lg ${
              idx === 0 ? 'bg-yellow-300' : idx === 1 ? 'bg-gray-300' : idx === 2 ? 'bg-orange-300' : 'bg-white'
            }`}
          >
            <span className="font-semibold text-gray-800">{player.name}</span>
            <span className="text-gray-700">{player.score} pts</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Leaderboard;
