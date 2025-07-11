"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: { type: 'click' | 'passive'; value: number };
  level: number;
}

interface UpgradeItemProps {
  upgrade: Upgrade;
  currentAstral: number;
  onPurchase: (upgradeId: string, cost: number, effect: { type: 'click' | 'passive'; value: number }) => void;
}

const UpgradeItem: React.FC<UpgradeItemProps> = ({ upgrade, currentAstral, onPurchase }) => {
  const canPurchase = currentAstral >= upgrade.cost;

  return (
    <Card className="bg-gray-700/70 backdrop-blur-sm border-gray-600 text-gray-100">
      <CardHeader>
        <CardTitle className="text-purple-300">{upgrade.name} (Ур. {upgrade.level})</CardTitle>
        <CardDescription className="text-gray-300">{upgrade.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold mb-2">Стоимость: {upgrade.cost} Астрала</p>
        <p className="text-md">Эффект: {upgrade.effect.type === 'click' ? 'Клик' : 'В секунду'}: +{upgrade.effect.value}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onPurchase(upgrade.id, upgrade.cost, upgrade.effect)}
          disabled={!canPurchase}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          {canPurchase ? 'Купить' : `Недостаточно Астрала (${upgrade.cost})`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpgradeItem;