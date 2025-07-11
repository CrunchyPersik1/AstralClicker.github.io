"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: {
    type: 'click' | 'passive';
    value: number;
  };
}

interface UpgradeItemProps {
  upgrade: Upgrade;
  currentMilk: number;
  onPurchase: (upgradeId: string, cost: number, effect: Upgrade['effect']) => void;
}

const UpgradeItem: React.FC<UpgradeItemProps> = ({ upgrade, currentMilk, onPurchase }) => {
  const canAfford = currentMilk >= upgrade.cost;

  return (
    <Card className="w-full max-w-sm bg-gray-700/70 backdrop-blur-sm border-gray-600 shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg text-yellow-200">{upgrade.name}</CardTitle>
        <CardDescription className="text-sm text-gray-300">{upgrade.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-md font-semibold mb-2 text-green-400">Стоимость: {upgrade.cost} молока</p>
        <p className="text-sm text-gray-200">
          Эффект: {upgrade.effect.type === 'click' ? `+${upgrade.effect.value} молока за клик` : `+${upgrade.effect.value} молока в секунду`}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onPurchase(upgrade.id, upgrade.cost, upgrade.effect)}
          disabled={!canAfford}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-500 disabled:text-gray-300"
        >
          {canAfford ? 'Купить' : 'Недостаточно молока'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpgradeItem;