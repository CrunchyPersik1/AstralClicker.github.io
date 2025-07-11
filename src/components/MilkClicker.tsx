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
  { id: 'click1', name: 'Астральный Всплеск', description: 'Увеличивает Астрал за клик.', cost: 15, effect: { type: 'click', value: 1 } },
  { id: 'passive1', name: 'Звездная Пыль', description: 'Начинает производить 1 Астрал в секунду.', cost: 100, effect: { type: 'passive', value: 1 } },
  { id: 'click2', name: 'Космический Импульс', description: 'Значительно увеличивает Астрал за клик.', cost: 100, effect: { type: 'click', value: 5 } },
  { id: 'passive2', name: 'Малая Туманность', description: 'Добавляет 5 Астрала в секунду.', cost: 500, effect: { type: 'passive', value: 5 } },
  { id: 'click3', name: 'Галактический Удар', description: 'Огромное увеличение Астрала за клик!', cost: 1000, effect: { type: 'click', value: 20 } },
  { id: 'passive3', name: 'Кварковая Фабрика', description: 'Добавляет 20 Астрала в секунду.', cost: 2500, effect: { type: 'passive', value: 20 } },
  { id: 'passive4', name: 'Черная Дыра', description: 'Производит 100 Астрала в секунду.', cost: 10000, effect: { type: 'passive', value: 100 } },
  { id: 'click4', name: 'Вселенский Клик', description: 'Невероятное увеличение Астрала за клик!', cost: 5000, effect: { type: 'click', value: 50 } },
  { id: 'passive5', name: 'Мультивселенная', description: 'Производит 500 Астрала в секунду.', cost: 50000, effect: { type: 'passive', value: 500 } },
  { id: 'passive6', name: 'Измерение Хаоса', description: 'Производит 2500 Астрала в секунду.', cost: 250000, effect: { type: 'passive', value: 2500 } },
  { id: 'click5', name: 'Божественный Клик', description: 'Максимальное увеличение Астрала за клик!', cost: 100000, effect: { type: 'click', value: 1000 } },
  { id: 'passive7', name: 'Космический Разум', description: 'Производит 10000 Астрала в секунду.', cost: 1000000, effect: { type: 'passive', value: 10000 } },
];

const AstralClicker: React.FC = () => {
  const [astralCount, setAstralCount] = useState<number>(0);
  const [astralPerClick, setAstralPerClick] = useState<number>(1);
  const [astralPerSecond, setAstralPerSecond] = useState<number>(0);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState<Set<string>>(new Set());

  const availableUpgrades = initialUpgrades.filter(
    (upgrade) => !purchasedUpgrades.has(upgrade.id)
  );

  const handleAstralClick = () => {
    setAstralCount((prev) => prev + astralPerClick);
  };

  const handlePurchaseUpgrade = (upgradeId: string, cost: number, effect: Upgrade['effect']) => {
    if (astralCount >= cost) {
      setAstralCount((prev) => prev - cost);
      setPurchasedUpgrades((prev) => new Set(prev).add(upgradeId));

      if (effect.type === 'click') {
        setAstralPerClick((prev) => prev + effect.value);
      } else if (effect.type === 'passive') {
        setAstralPerSecond((prev) => prev + effect.value);
      }
      showSuccess(`Успешно куплено: ${initialUpgrades.find(u => u.id === upgradeId)?.name}!`);
    } else {
      showError('Недостаточно Астрала для покупки этого улучшения.');
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (astralPerSecond > 0) {
      interval = setInterval(() => {
        setAstralCount((prev) => prev + astralPerSecond);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [astralPerSecond]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-900 to-black text-gray-100 p-4">
      {/* Left Section: Clicker */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:w-1/3">
        {/* Astral Count Card */}
        <Card className="w-full max-w-md bg-gray-800/70 backdrop-blur-sm border-gray-700 shadow-lg rounded-lg p-6 mb-8 text-center">
          <CardTitle className="text-4xl font-bold text-purple-400 mb-2">Астрал: {Math.floor(astralCount)}</CardTitle>
          <p className="text-lg text-gray-300">
            Астрала за клик: {astralPerClick} | Астрала в секунду: {astralPerSecond}
          </p>
        </Card>

        {/* Click Button */}
        <Button
          onClick={handleAstralClick}
          className="relative w-64 h-64 lg:w-80 lg:h-80 bg-transparent hover:scale-105 transition-transform transform active:scale-95 shadow-2xl flex items-center justify-center overflow-hidden group"
          style={{
            backgroundImage: 'url("https://i.imgur.com/your_uploaded_image_id.jpg")', // ЗАМЕНИТЕ ЭТОТ URL НА ВАШЕ ЗАГРУЖЕННОЕ ИЗОБРАЖЕНИЕ
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            border: 'none',
          }}
        >
          <span className="sr-only">Кликнуть на Астральную сущность</span>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
        </Button>
      </div>

      {/* Right Section: Upgrades */}
      <div className="flex-1 p-4 lg:w-2/3 lg:ml-8">
        <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center lg:text-left">Улучшения</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {availableUpgrades.length > 0 ? (
            availableUpgrades.map((upgrade) => (
              <UpgradeItem
                key={upgrade.id}
                upgrade={upgrade}
                currentAstral={astralCount}
                onPurchase={handlePurchaseUpgrade}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-400">
              Все улучшения куплены! Вы настоящий Астральный Владыка!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AstralClicker;