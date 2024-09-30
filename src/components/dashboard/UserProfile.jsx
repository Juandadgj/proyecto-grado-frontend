// src/components/UserProfileCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserProfileCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <div>
          <h3 className="text-lg font-semibold">User Name</h3>
          <p className="text-sm text-gray-500">Level 5</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
