"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Cosmetic {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'background' | 'clicker_skin';
  value: string; // URL или Tailwind класс
}

interface CosmeticItemProps {
  cosmetic: Cosmetic;
  currentAstral: number;
  isPurchased: boolean;
  isActive: boolean;
  onPurchase: (cosmeticId: string, cost: number) => void;
  onApply: (cosmetic: Cosmetic) => void;
}

const CosmeticItem: React.FC<CosmeticItemProps> = ({
  cosmetic,
  currentAstral,
  isPurchased,
  isActive,
  onPurchase,
  onApply,
}) => {
  const canAfford = currentAstral >= cosmetic.cost;

  return (
    <Card className="w-full max-w-sm bg-gray-700/70 backdrop-blur-sm border-gray-600 shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg text-blue-300">{cosmetic.name}</CardTitle>
        <CardDescription className="text-sm text-gray-300">{cosmetic.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-md font-semibold mb-2 text-yellow-400">Стоимость: {cosmetic.cost} Астрала</p>
        {cosmetic.type === 'background' && (
          <div className="w-full h-24 bg-cover bg-center rounded-md border border-gray-500" style={{ backgroundImage: `url(${cosmetic.value})` }}></div>
        )}
        {cosmetic.type === 'clicker_skin' && (
          <div className="w-24 h-24 mx-auto bg-cover bg-center rounded-full border border-gray-500" style={{ backgroundImage: `url(${cosmetic.value})` }}></div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {!isPurchased ? (
          <Button
            onClick={() => onPurchase(cosmetic.id, cosmetic.cost)}
            disabled={!canAfford}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-500 disabled:text-gray-300"
          >
            {canAfford ? 'Купить' : 'Недостаточно Астрала'}
          </Button>
        ) : (
          <Button
            onClick={() => onApply(cosmetic)}
            disabled={isActive}
            className="w-full bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-500 disabled:text-gray-300"
          >
            {isActive ? 'Применено' : 'Применить'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CosmeticItem;