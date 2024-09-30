// src/components/OngoingLessonCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OngoingLessonCard = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Ongoing Lesson</CardTitle>
      </CardHeader>
      <CardContent>
        <video
          src="/https://www.youtube.com/watch?v=PjqwjcuQ29A"
          controls
          className="w-full aspect-video mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">Language Basics</h3>
        <p className="text-sm text-gray-500">Ends in: 45 min</p>
      </CardContent>
    </Card>
  );
};

export default OngoingLessonCard;
