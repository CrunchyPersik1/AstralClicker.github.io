"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number; // Это будет текущая рассчитанная стоимость
  effect: {
    type: 'click' | 'passive';
    value: number; // Это будет текущее рассчитанное значение эффекта
  };
  level: number; // Текущий уровень улучшения
}

interface UpgradeItemProps {
  upgrade: Upgrade;
  currentAstral: number;
  onPurchase: (upgradeId: string, cost: number, effect: Upgrade['effect']) => void;
}

const UpgradeItem: React.FC<UpgradeItemProps> = ({ upgrade, currentAstral, onPurchase }) => {
  const canAfford = currentAstral >= upgrade.cost;

  return (
    <Card className="w-full max-w-sm bg-gray-700/70 backdrop-blur-sm border-gray-600 shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg text-purple-300">{upgrade.name} (Ур. {upgrade.level})</CardTitle>
        <CardDescription className="text-sm text-gray-300">{upgrade.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-md font-semibold mb-2 text-green-400">Стоимость: {upgrade.cost} Астрала</p>
        <p className="text-sm text-gray-200">
          Эффект: {upgrade.effect.type === 'click' ? `+${upgrade.effect.value} Астрала за клик` : `+${upgrade.effect.value} Астрала в секунду`}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onPurchase(upgrade.id, upgrade.cost, upgrade.effect)}
          disabled={!canAfford}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:bg-gray-500 disabled:text-gray-300"
        >
          {canAfford ? 'Купить' : 'Недостаточно Астрала'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpgradeItem;