"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lock } from 'lucide-react'; // Icons for unlocked/locked
import { Achievement } from '@/lib/gameData';

interface AchievementWithStatus extends Achievement {
  unlocked: boolean;
}

interface AchievementsListProps {
  achievements: AchievementWithStatus[];
}

const AchievementsList: React.FC<AchievementsListProps> = ({ achievements }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center lg:text-left">Достижения</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`bg-gray-700/70 backdrop-blur-sm border-gray-600 text-gray-100 ${
              achievement.unlocked ? 'border-green-500' : 'border-gray-600 opacity-70'
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-x-4">
              <div className="flex-1">
                <CardTitle className="text-yellow-300">{achievement.name}</CardTitle>
                <CardDescription className="text-gray-300">{achievement.description}</CardDescription>
              </div>
              {achievement.unlocked ? (
                <CheckCircle className="text-green-500" size={32} />
              ) : (
                <Lock className="text-gray-400" size={32} />
              )}
            </CardHeader>
            <CardContent>
              <p className={`text-sm ${achievement.unlocked ? 'text-green-400' : 'text-gray-400'}`}>
                Статус: {achievement.unlocked ? 'Разблокировано' : 'Заблокировано'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AchievementsList;