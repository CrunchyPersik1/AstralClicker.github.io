"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lock } from 'lucide-react'; // Иконки для статуса

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
}

const AchievementItem: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  return (
    <Card className={`w-full bg-gray-700/70 backdrop-blur-sm border-gray-600 shadow-md rounded-lg ${achievement.unlocked ? 'border-green-500' : 'border-gray-600 opacity-70'}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-lg font-medium ${achievement.unlocked ? 'text-green-400' : 'text-gray-300'}`}>
          {achievement.name}
        </CardTitle>
        {achievement.unlocked ? (
          <CheckCircle className="h-6 w-6 text-green-500" />
        ) : (
          <Lock className="h-6 w-6 text-gray-400" />
        )}
      </CardHeader>
      <CardContent>
        <CardDescription className={`text-sm ${achievement.unlocked ? 'text-gray-200' : 'text-gray-400'}`}>
          {achievement.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default AchievementItem;