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
  { id: 'click1', name: 'Улучшенная Дойка', description: 'Увеличивает молоко за клик.', cost: 15, effect: { type: 'click', value: 1 } },
  { id: 'passive1', name: 'Молочная Корова', description: 'Начинает производить 1 молоко в секунду.', cost: 100, effect: { type: 'passive', value: 1 } },
  { id: 'click2', name: 'Двойной Напор', description: 'Значительно увеличивает молоко за клик.', cost: 100, effect: { type: 'click', value: 5 } },
  { id: 'passive2', name: 'Маленькая Ферма', description: 'Добавляет 5 молока в секунду.', cost: 500, effect: { type: 'passive', value: 5 } },
  { id: 'click3', name: 'Молочный Взрыв', description: 'Огромное увеличение молока за клик!', cost: 1000, effect: { type: 'click', value: 20 } },
  { id: 'passive3', name: 'Средняя Ферма', description: 'Добавляет 20 молока в секунду.', cost: 2500, effect: { type: 'passive', value: 20 } },
  { id: 'passive4', name: 'Молочный Завод', description: 'Производит 100 молока в секунду.', cost: 10000, effect: { type: 'passive', value: 100 } },
  { id: 'click4', name: 'Галактический Клик', description: 'Невероятное увеличение молока за клик!', cost: 5000, effect: { type: 'click', value: 50 } },
  { id: 'passive5', name: 'Межгалактическая Молочная Империя', description: 'Производит 500 молока в секунду.', cost: 50000, effect: { type: 'passive', value: 500 } },
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 p-4">
      {/* Left Section: Clicker */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:w-1/3">
        {/* Milk Count Card */}
        <Card className="w-full max-w-md bg-gray-700/70 backdrop-blur-sm border-gray-600 shadow-lg rounded-lg p-6 mb-8 text-center">
          <CardTitle className="text-4xl font-bold text-yellow-300 mb-2">Молоко: {Math.floor(milkCount)}</CardTitle>
          <p className="text-lg text-gray-300">
            Молока за клик: {milkPerClick} | Молока в секунду: {milkPerSecond}
          </p>
        </Card>

        {/* Click Button */}
        <Button
          onClick={handleMilkClick}
          className="relative w-64 h-64 lg:w-80 lg:h-80 bg-transparent hover:scale-105 transition-transform transform active:scale-95 shadow-2xl flex items-center justify-center overflow-hidden group"
          style={{
            backgroundImage: 'url("https://i.imgur.com/2z3Q20L.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            border: 'none',
          }}
        >
          <span className="sr-only">Кликнуть на бутылку молока</span>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
        </Button>
      </div>

      {/* Right Section: Upgrades */}
      <div className="flex-1 p-4 lg:w-2/3 lg:ml-8">
        <h2 className="text-3xl font-bold text-yellow-300 mb-6 text-center lg:text-left">Улучшения</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
            <p className="col-span-full text-center text-lg text-gray-400">
              Все улучшения куплены! Вы настоящий молочный магнат!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MilkClicker;