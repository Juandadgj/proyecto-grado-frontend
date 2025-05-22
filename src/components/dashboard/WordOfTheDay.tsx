// components/dashboard/WordOfTheDay.tsx
'use client'
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const WordOfTheDay = ({ word, definition }: { word: string; definition: string }) => {
  return (
    <motion.div
      className="rounded-2xl bg-yellow-100 border-2 border-yellow-300 p-4 flex gap-4 items-center shadow-md"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-yellow-400 text-white p-3 rounded-full">
        <BookOpen size={28} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-yellow-700">Palabra del Día</h2>
        <p className="text-lg font-bold">{word}</p>
        <p className="text-sm text-yellow-600 italic">{definition}</p>
      </div>
    </motion.div>
  );
};

export default WordOfTheDay;
