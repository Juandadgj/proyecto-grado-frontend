'use client'
import Sidebar from '@/components/Sidebar'
import React, { useEffect, useState } from 'react'
import CarouselDashboard from '../../../components/CarouselDashboard';
import SearchBar from '@/components/SearchBar';
import Progress from '@/components/Progress';
import UserProfileCard from '@/components/dashboard/UserProfile'
import OngoingLessonCard from '@/components/dashboard/OngoingLesson'
import AchievementsCard from '@/components/dashboard/Achievements'
import LivesCard from '@/components/dashboard/LivesDisplay'
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import { getSessionFromServer } from '@/lib/auth/getSessionAction';
import LevelDisplay from '@/components/dashboard/LevelDisplay';
import PlayNowCard from '@/components/dashboard/PlayNowCard';
import DailyStreak from '@/components/dashboard/DailyStreak';
import WordOfTheDay from '@/components/dashboard/WordOfTheDay';
import Leaderboard from '@/components/dashboard/Leaderboard';

const Dashboard = () => {
  const [session, setSession] = useState<{ name?: string } | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSessionFromServer();
      console.log("TU", sessionData);
      setSession(sessionData);
    };
    fetchSession();
  }, []);

  const streakCount = 5;

const wordOfTheDay = {
  word: "Mariposa",
  definition: "Insecto colorido que vuela y se transforma desde una oruga."
};

const leaderboardData = [
  { name: "Lucía", score: 1200 },
  { name: "Mateo", score: 1100 },
  { name: "Sofía", score: 1000 },
  { name: "Tomás", score: 900 },
  { name: "Valentina", score: 850 }
];

  return (
    <div className='w-full p-16 pt-10 bg-gradient-to-r from-[#c5f7fa] via-[#e3feff] to-[#F9F9F9] '>
      <div className='flex flex-row justify-between w-full'>
        <WelcomeBanner userName={session?.name} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        <LevelDisplay totalPoints={10} />
        <PlayNowCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <UserProfileCard />
          {/* <LivesCard lives={lives} nextLifeTime={nextLifeTime} formatTime={formatTime} /> */}
          <AchievementsCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
  <DailyStreak streakCount={streakCount} />
  <WordOfTheDay word={wordOfTheDay.word} definition={wordOfTheDay.definition} />
  <Leaderboard ranking={leaderboardData} />
</div>
    </div>
  )
}

export default Dashboard