"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpgradeItem from './UpgradeItem';
import CosmeticShop from './CosmeticShop';
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

interface Cosmetic {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'background' | 'clicker_skin';
  value: string;
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

const initialCosmetics: Cosmetic[] = [
  // Backgrounds
  { id: 'bg_default', name: 'Стандартный Фон', description: 'Базовый фон игры.', cost: 0, type: 'background', value: 'none' },
  { id: 'bg_stars', name: 'Звездное Поле', description: 'Мерцающее поле далеких звезд.', cost: 1000, type: 'background', value: 'https://i.postimg.cc/pr211111/stars.jpg' },
  { id: 'bg_galaxy', name: 'Галактическое Сердце', description: 'Пульсирующая галактика в центре вселенной.', cost: 50000, type: 'background', value: 'https://i.postimg.cc/pr211111/galaxy.jpg' },
  { id: 'bg_nebula', name: 'Туманность Омега', description: 'Яркие цвета космической туманности.', cost: 250000, type: 'background', value: 'https://i.postimg.cc/pr211111/nebula.jpg' },
  { id: 'bg_void', name: 'Квантовая Пустота', description: 'Глубокая и таинственная пустота.', cost: 1000000, type: 'background', value: 'https://i.postimg.cc/pr211111/void.jpg' },
  { id: 'bg_multiverse', name: 'Мультивселенский Коллапс', description: 'Вихрь реальностей, сливающихся воедино.', cost: 1500000000, type: 'background', value: 'https://i.postimg.cc/pr211111/multiverse.jpg' },

  // Clicker Skins
  { id: 'skin_default', name: 'Базовый Астрал', description: 'Стандартный вид Астральной сущности.', cost: 0, type: 'clicker_skin', value: 'https://i.postimg.cc/fRSJZP69/image.jpg' },
  { id: 'skin_radiant', name: 'Сияющий Астрал', description: 'Астрал, излучающий мощную энергию.', cost: 5000, type: 'clicker_skin', value: 'https://i.postimg.cc/pr211111/radiant_astral.jpg' },
  { id: 'skin_ancient', name: 'Древний Артефакт', description: 'Загадочный артефакт, хранящий древние секреты.', cost: 100000, type: 'clicker_skin', value: 'https://i.postimg.cc/pr211111/ancient_artifact.jpg' },
  { id: 'skin_cosmic_egg', name: 'Космическое Яйцо', description: 'Источник новой вселенной.', cost: 5000000, type: 'clicker_skin', value: 'https://i.postimg.cc/pr211111/cosmic_egg.jpg' },
];


const AstralClicker: React.FC = () => {
  const [astralCount, setAstralCount] = useState<number>(0);
  const [astralPerClick, setAstralPerClick] = useState<number>(1);
  const [astralPerSecond, setAstralPerSecond] = useState<number>(0);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState<Set<string>>(new Set());
  const [purchasedCosmetics, setPurchasedCosmetics] = useState<Set<string>>(new Set(['bg_default', 'skin_default'])); // Default items are "purchased"
  const [activeBackground, setActiveBackground] = useState<string>('bg_default');
  const [activeClickerSkin, setActiveClickerSkin] = useState<string>('skin_default');

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

  const handlePurchaseCosmetic = (cosmeticId: string, cost: number) => {
    if (astralCount >= cost) {
      setAstralCount((prev) => prev - cost);
      setPurchasedCosmetics((prev) => new Set(prev).add(cosmeticId));
      showSuccess(`Успешно куплено: ${initialCosmetics.find(c => c.id === cosmeticId)?.name}!`);
    } else {
      showError('Недостаточно Астрала для покупки этого косметического предмета.');
    }
  };

  const handleApplyCosmetic = (cosmetic: Cosmetic) => {
    if (cosmetic.type === 'background') {
      setActiveBackground(cosmetic.id);
      showSuccess(`Фон "${cosmetic.name}" применен!`);
    } else if (cosmetic.type === 'clicker_skin') {
      setActiveClickerSkin(cosmetic.id);
      showSuccess(`Скин кликера "${cosmetic.name}" применен!`);
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

  const currentBackgroundValue = initialCosmetics.find(c => c.id === activeBackground)?.value || 'none';
  const currentClickerSkinValue = initialCosmetics.find(c => c.id === activeClickerSkin)?.value || 'https://i.postimg.cc/fRSJZP69/image.jpg';


  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row text-gray-100 p-4 transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: currentBackgroundValue !== 'none' ? `url(${currentBackgroundValue})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: currentBackgroundValue === 'none' ? 'black' : 'transparent',
      }}
    >
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
            backgroundImage: `url(${currentClickerSkinValue})`,
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

      {/* Right Section: Upgrades & Cosmetics */}
      <div className="flex-1 p-4 lg:w-2/3 lg:ml-8">
        <Tabs defaultValue="upgrades" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-800/70 backdrop-blur-sm border-gray-700">
            <TabsTrigger value="upgrades" className="text-lg text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white">Улучшения</TabsTrigger>
            <TabsTrigger value="cosmetics" className="text-lg text-blue-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Магазин Косметики</TabsTrigger>
          </TabsList>
          <TabsContent value="upgrades">
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
          </TabsContent>
          <TabsContent value="cosmetics">
            <CosmeticShop
              currentAstral={astralCount}
              purchasedCosmetics={purchasedCosmetics}
              activeBackground={activeBackground}
              activeClickerSkin={activeClickerSkin}
              onPurchaseCosmetic={handlePurchaseCosmetic}
              onApplyCosmetic={handleApplyCosmetic}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstralClicker;