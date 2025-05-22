"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Smile } from "lucide-react";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "¡Buenos días!";
  if (hour < 18) return "¡Buenas tardes!";
  return "¡Buenas noches!";
};

const WelcomeBanner = ({ userName = "Usuario" }: { userName?: string }) => {
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000); // actualiza el saludo cada minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="w-full bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl shadow-lg p-6 md:p-10 flex items-center gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white p-4 rounded-full shadow-md">
        <Smile className="text-indigo-600 w-8 h-8" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-indigo-900">
          {greeting} {userName} 👋
        </h2>
        <p className="text-gray-700 mt-1">
          Esperamos que tengas un día productivo. ¡Explora y sigue creciendo en el proceso!
        </p>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;
