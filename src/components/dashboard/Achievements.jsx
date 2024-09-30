// src/components/AchievementsCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AchievementsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Badge variant="secondary">Fast Learner</Badge>
        <Badge variant="secondary">Quiz Master</Badge>
        <Badge variant="secondary">Consistent</Badge>
        <Badge variant="outline">Polyglot</Badge>
        <Badge variant="outline">Grammar Guru</Badge>
      </CardContent>
    </Card>
  );
};

export default AchievementsCard;
