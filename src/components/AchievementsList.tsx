"use client";

import React from 'react';
import AchievementItem from './AchievementItem';

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
}

interface AchievementsListProps {
  achievements: Achievement[];
}

const AchievementsList: React.FC<AchievementsListProps> = ({ achievements }) => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center lg:text-left">Достижения</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <AchievementItem key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};

export default AchievementsList;