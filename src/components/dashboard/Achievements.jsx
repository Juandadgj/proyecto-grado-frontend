'use client';
import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Brain, Star, Clock, Globe, BookOpen } from 'lucide-react';
import clsx from 'clsx';

const achievements = [
  {
    id: 1,
    name: 'Fast Learner',
    icon: Brain,
    unlocked: true,
    description: 'Terminaste una lección en tiempo récord',
  },
  {
    id: 2,
    name: 'Quiz Master',
    icon: Star,
    unlocked: true,
    description: 'Obtuviste 100% en un cuestionario',
  },
  {
    id: 3,
    name: 'Consistent',
    icon: Clock,
    unlocked: true,
    description: 'Jugaste 5 días seguidos',
  },
  {
    id: 4,
    name: 'Polyglot',
    icon: Globe,
    unlocked: false,
    description: 'Completaste juegos en 3 idiomas',
  },
  {
    id: 5,
    name: 'Grammar Guru',
    icon: BookOpen,
    unlocked: false,
    description: 'Dominaste todas las reglas gramaticales',
  },
];

const AchievementsCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-2xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🏅 Tus Logros</h2>
      <div className="flex gap-4 flex-wrap">
        {achievements.map(({ id, name, icon: Icon, unlocked, description }) => (
          <Tooltip.Provider key={id} delayDuration={200}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div
                  className={clsx(
                    "w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer",
                    unlocked
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400 opacity-50"
                  )}
                >
                  <Icon size={28} />
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="top"
                  className="bg-black text-white text-xs rounded px-3 py-2 shadow-lg animate-fade-in z-50"
                  sideOffset={5}
                >
                  <div className="font-semibold">{name}</div>
                  <div className="text-gray-300">{description}</div>
                  <Tooltip.Arrow className="fill-black" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        ))}
      </div>
    </div>
  );
};

export default AchievementsCard;
