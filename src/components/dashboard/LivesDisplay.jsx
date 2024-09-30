// src/components/LivesCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LivesCard = ({ lives, nextLifeTime, formatTime }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lives</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={i < lives ? 'text-red-500' : 'text-gray-300'} className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          ))}
        </div>
        {lives < 5 && (
          <p className="text-sm text-gray-500">Siguiente vida en: {formatTime(nextLifeTime)}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default LivesCard;
