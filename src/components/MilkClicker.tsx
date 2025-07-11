"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UpgradeItem from './UpgradeItem';
import { showSuccess, showError } from '@/utils/toast';

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

const initialUpgrades: Upgrade[] = [
  {
    id: 'click1',
    name: 'Улучшенный клик',
    description: 'Увеличивает количество молока за каждый клик.',
    cost: 10,
    effect: { type: 'click', value: 1 },
  },
  {
    id: 'passive1',
    name: 'Маленькая ферма',
    description: 'Начинает производить молоко автоматически.',
    cost: 50,
    effect: { type: 'passive', value: 1 },
  },
  {
    id: 'click2',
    name: 'Двойной клик',
    description: 'Значительно увеличивает количество молока за клик.',
    cost: 200,
    effect: { type: 'click', value: 5 },
  },
  {
    id: 'passive2',
    name: 'Средняя ферма',
    description: 'Увеличивает автоматическое производство молока.',
    cost: 500,
    effect: { type: 'passive', value: 5 },
  },
  {
    id: 'click3',
    name: 'Супер клик',
    description: 'Огромное увеличение молока за клик!',
    cost: 1000,
    effect: { type: 'click', value: 20 },
  },
  {
    id: 'passive3',
    name: 'Большая ферма',
    description: 'Максимальное автоматическое производство молока.',
    cost: 2000,
    effect: { type: 'passive', value: 20 },
  },
];

const MilkClicker: React.FC = () => {
  const [milkCount, setMilkCount] = useState<number>(0);
  const [milkPerClick, setMilkPerClick] = useState<number>(1);
  const [milkPerSecond, setMilkPerSecond] = useState<number>(0);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState<Set<string>>(new Set());

  const availableUpgrades = initialUpgrades.filter(
    (upgrade) => !purchasedUpgrades.has(upgrade.id)
  );

  const handleMilkClick = () => {
    setMilkCount((prev) => prev + milkPerClick);
  };

  const handlePurchaseUpgrade = (upgradeId: string, cost: number, effect: Upgrade['effect']) => {
    if (milkCount >= cost) {
      setMilkCount((prev) => prev - cost);
      setPurchasedUpgrades((prev) => new Set(prev).add(upgradeId));

      if (effect.type === 'click') {
        setMilkPerClick((prev) => prev + effect.value);
      } else if (effect.type === 'passive') {
        setMilkPerSecond((prev) => prev + effect.value);
      }
      showSuccess(`Успешно куплено: ${initialUpgrades.find(u => u.id === upgradeId)?.name}!`);
    } else {
      showError('Недостаточно молока для покупки этого улучшения.');
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (milkPerSecond > 0) {
      interval = setInterval(() => {
        setMilkCount((prev) => prev + milkPerSecond);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [milkPerSecond]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 text-gray-800 dark:text-gray-100">
      <Card className="w-full max-w-2xl bg-white/70 backdrop-blur-md border-gray-300 dark:bg-gray-900/70 dark:border-gray-700 shadow-lg rounded-lg p-6 mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-2">Молочный Кликер</CardTitle>
          <p className="text-xl">Нажмите на стакан, чтобы получить молоко!</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <p className="text-5xl font-extrabold text-green-700 dark:text-green-400 mb-4">
            Молоко: {Math.floor(milkCount)}
          </p>
          <p className="text-lg mb-6">
            Молока за клик: {milkPerClick} | Молока в секунду: {milkPerSecond}
          </p>
          <Button
            onClick={handleMilkClick}
            className="relative w-48 h-48 rounded-full bg-blue-500 hover:bg-blue-600 transition-transform transform active:scale-95 shadow-xl flex items-center justify-center overflow-hidden group"
            style={{
              backgroundImage: 'url("https://www.svgrepo.com/show/499000/milk-glass.svg")',
              backgroundSize: '80%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <span className="sr-only">Кликнуть на стакан молока</span>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </Button>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-6">Улучшения</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {availableUpgrades.length > 0 ? (
          availableUpgrades.map((upgrade) => (
            <UpgradeItem
              key={upgrade.id}
              upgrade={upgrade}
              currentMilk={milkCount}
              onPurchase={handlePurchaseUpgrade}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-lg text-gray-700 dark:text-gray-300">
            Все улучшения куплены! Вы настоящий молочный магнат!
          </p>
        )}
      </div>
    </div>
  );
};

export default MilkClicker;