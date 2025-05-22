"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import Link from "next/link";

const PlayNowCard = () => {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-pink-400 to-purple-600 text-white rounded-2xl shadow-2xl p-6 overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Estrellas flotantes */}
      <motion.div
        className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />

      <div className="flex flex-col items-center text-center space-y-4 z-10 relative">
        <motion.div
          whileHover={{ rotate: 20, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white text-purple-600 p-4 rounded-full shadow-lg"
        >
          <Gamepad2 size={40} />
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold">
          ¿Listo para divertirte?
        </h2>
        <p className="text-white/90 text-sm md:text-base">
          Juega, aprende y gana puntos completando desafíos interactivos. ¡Es tu momento!
        </p>

        <Link href="/dashboard/games">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="mt-2 bg-white text-purple-600 font-bold px-6 py-2 rounded-full shadow-md hover:bg-purple-100 transition-all"
          >
            ¡Vamos a jugar!
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default PlayNowCard;
