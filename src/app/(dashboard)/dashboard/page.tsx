'use client'
import Sidebar from '@/components/Sidebar'
import React, { useState } from 'react'
import CarouselDashboard from '../../../components/CarouselDashboard';
import SearchBar from '@/components/SearchBar';
import Progress from '@/components/Progress';
import UserProfileCard from '@/components/dashboard/UserProfile'
import OngoingLessonCard from '@/components/dashboard/OngoingLesson'
import AchievementsCard from '@/components/dashboard/Achievements'
import LivesCard from '@/components/dashboard/LivesDisplay'

const Dashboard = () => {

  const [lives, setLives] = useState(3);
  const [nextLifeTime, setNextLifeTime] = useState(900); // 15 minutes in seconds

  React.useEffect(() => {
    const timer = setInterval(() => {
      setNextLifeTime((prev) => {
        if (prev <= 0 && lives < 5) {
          setLives((prevLives) => prevLives + 1);
          return 900;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lives]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='w-full h-screen p-16 pt-20 bg-gradient-to-r from-[#b1f9fd] via-[#d1fbfd] to-[#F9F9F9] '>
      <div className='flex flex-row justify-between h-[60px] w-full'>
        <SearchBar />
        <div className='flex flex-row space-x-4'>
          <button style={{ boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.4)' }} className='hover:-translate-y-1 transition-all duration-300 w-11 h-11 shadow-xl rounded-lg flex items-center justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="#B90512" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          </button>

          <button style={{ boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.4)' }} className='hover:-translate-y-1 transition-all duration-300 w-11 h-11 shadow-xl rounded-lg flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#B90512" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <OngoingLessonCard />
        <div className="space-y-6">
          <UserProfileCard />
          <LivesCard lives={lives} nextLifeTime={nextLifeTime} formatTime={formatTime} />
          <AchievementsCard />
        </div>
      </div>
    </div>
  )
}

export default Dashboard