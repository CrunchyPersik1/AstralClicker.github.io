"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpgradeItem from './UpgradeItem';
import CosmeticShop from './CosmeticShop';
import ClickParticle from './ClickParticle';
import FallingCookie from './FallingCookie';
import AchievementsList from './AchievementsList';
import { showSuccess, showError } from '@/utils/toast';

interface UpgradeDefinition {
  id: string;
  name: string;
  description: string;
  type: 'click' | 'passive';
  baseCost: number;
  costMultiplier: number;
  baseEffectValue: number;
  effectMultiplier: number;
}

interface Cosmetic {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'background' | 'clicker_skin';
  value: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: (state: {
    astralCount: number;
    astralPerClick: number;
    astralPerSecond: number;
    purchasedUpgradeLevels: Map<string, number>;
    purchasedCosmetics: Set<string>;
  }) => boolean;
}

const initialUpgrades: UpgradeDefinition[] = [
  { id: 'click1', name: 'Астральный Всплеск', description: 'Увеличивает Астрал за клик.', type: 'click', baseCost: 15, costMultiplier: 1.15, baseEffectValue: 1, effectMultiplier: 1.1 },
  { id: 'passive1', name: 'Звездная Пыль', description: 'Начинает производить Астрал в секунду.', type: 'passive', baseCost: 100, costMultiplier: 1.15, baseEffectValue: 1, effectMultiplier: 1.1 },
  { id: 'click2', name: 'Космический Импульс', description: 'Значительно увеличивает Астрал за клик.', type: 'click', baseCost: 100, costMultiplier: 1.15, baseEffectValue: 5, effectMultiplier: 1.1 },
  { id: 'passive2', name: 'Малая Туманность', description: 'Добавляет Астрала в секунду.', type: 'passive', baseCost: 500, costMultiplier: 1.15, baseEffectValue: 5, effectMultiplier: 1.1 },
  { id: 'click3', name: 'Галактический Удар', description: 'Огромное увеличение Астрала за клик!', type: 'click', baseCost: 1000, costMultiplier: 1.15, baseEffectValue: 20, effectMultiplier: 1.1 },
  { id: 'passive3', name: 'Кварковая Фабрика', description: 'Добавляет Астрала в секунду.', type: 'passive', baseCost: 2500, costMultiplier: 1.15, baseEffectValue: 20, effectMultiplier: 1.1 },
  { id: 'passive4', name: 'Черная Дыра', description: 'Производит Астрала в секунду.', type: 'passive', baseCost: 10000, costMultiplier: 1.15, baseEffectValue: 100, effectMultiplier: 1.1 },
  { id: 'click4', name: 'Вселенский Клик', description: 'Невероятное увеличение Астрала за клик!', type: 'click', baseCost: 5000, costMultiplier: 1.15, baseEffectValue: 50, effectMultiplier: 1.1 },
  { id: 'passive5', name: 'Мультивселенная', description: 'Производит Астрала в секунду.', type: 'passive', baseCost: 50000, costMultiplier: 1.15, baseEffectValue: 500, effectMultiplier: 1.1 },
  { id: 'passive6', name: 'Измерение Хаоса', description: 'Производит Астрала в секунду.', type: 'passive', baseCost: 250000, costMultiplier: 1.15, baseEffectValue: 2500, effectMultiplier: 1.1 },
  { id: 'click5', name: 'Божественный Клик', description: 'Максимальное увеличение Астрала за клик!', type: 'click', baseCost: 100000, costMultiplier: 1.15, baseEffectValue: 1000, effectMultiplier: 1.1 },
  { id: 'passive7', name: 'Космический Разум', description: 'Производит Астрала в секунду.', type: 'passive', baseCost: 1000000, costMultiplier: 1.15, baseEffectValue: 10000, effectMultiplier: 1.1 },
];

const initialCosmetics: Cosmetic[] = [
  // Backgrounds
  { id: 'bg_default', name: 'Стандартный Фон', description: 'Базовый фон игры.', cost: 0, type: 'background', value: 'none' },
  { id: 'bg_stars', name: 'Звездное Поле', description: 'Мерцающее поле далеких звезд.', cost: 1000, type: 'background', value: 'https://i.postimg.cc/MT4SFCdm/image.jpg' },
  { id: 'bg_galaxy', name: 'Галактическое Сердце', description: 'Пульсирующая галактика в центре вселенной.', cost: 50000, type: 'background', value: 'https://i.postimg.cc/4dFfT7Nt/image.jpg' },
  { id: 'bg_nebula', name: 'Туманность Омега', description: 'Яркие цвета космической туманности.', cost: 250000, type: 'background', value: 'https://i.postimg.cc/yWCzVFqJ/image.jpg' },
  { id: 'bg_void', name: 'Квантовая Пустота', description: 'Глубокая и таинственная пустота.', cost: 1000000, type: 'background', value: 'https://i.postimg.cc/vTfZL8bV/image.jpg' },
  { id: 'bg_multiverse', name: 'Мультивселенский Коллапс', description: 'Вихрь реальностей, сливающихся воедино.', cost: 1500000000, type: 'background', value: 'https://i.postimg.cc/R0S46QWK/image.jpg' },

  // Clicker Skins
  { id: 'skin_default', name: 'Базовый Астрал', description: 'Стандартный вид Астральной сущности.', cost: 0, type: 'clicker_skin', value: 'https://i.postimg.cc/fRSJZP69/image.jpg' },
  { id: 'skin_radiant', name: 'Сияющий Астрал', description: 'Астрал, излучающий мощную энергию.', cost: 5000, type: 'clicker_skin', value: 'https://i.postimg.cc/RVwWwdZD/image.jpg' },
  { id: 'skin_ancient', name: 'Древний Артефакт', description: 'В разработке', cost: Infinity, type: 'clicker_skin', value: 'https://i.postimg.cc/pr211111/ancient_artifact.jpg' },
  { id: 'skin_cosmic_egg', name: 'Космическое Яйцо', description: 'В разработке', cost: Infinity, type: 'clicker_skin', value: 'https://i.postimg.cc/pr211111/cosmic_egg.jpg' },
];

const allAchievements: Achievement[] = [
  { id: 'astral_100', name: 'Начало Пути', description: 'Накопите 100 Астрала.', condition: (state) => state.astralCount >= 100 },
  { id: 'astral_1000', name: 'Астральный Накопитель', description: 'Накопите 1,000 Астрала.', condition: (state) => state.astralCount >= 1000 },
  { id: 'astral_10000', name: 'Мастер Астрала', description: 'Накопите 10,000 Астрала.', condition: (state) => state.astralCount >= 10000 },
  { id: 'astral_per_second_10', name: 'Пассивный Доход', description: 'Достигните 10 Астрала в секунду.', condition: (state) => state.astralPerSecond >= 10 },
  { id: 'astral_per_second_100', name: 'Астральный Поток', description: 'Достигните 100 Астрала в секунду.', condition: (state) => state.astralPerSecond >= 100 },
  { id: 'upgrades_3', name: 'Первые Шаги', description: 'Купите 3 уровня улучшений.', condition: (state) => Array.from(state.purchasedUpgradeLevels.values()).reduce((sum, level) => sum + level, 0) >= 3 },
  { id: 'upgrades_10', name: 'Опытный Инвестор', description: 'Купите 10 уровней улучшений.', condition: (state) => Array.from(state.purchasedUpgradeLevels.values()).reduce((sum, level) => sum + level, 0) >= 10 },
  { id: 'cosmetic_1', name: 'Модник', description: 'Купите 1 косметический предмет (кроме стартовых).', condition: (state) => state.purchasedCosmetics.size > 2 }, // bg_default and skin_default are 2
  { id: 'cosmetic_all_backgrounds', name: 'Коллекционер Фонов', description: 'Купите все фоны.', condition: (state) => {
    const allBackgrounds = initialCosmetics.filter(c => c.type === 'background' && c.cost !== 0);
    return allBackgrounds.every(bg => state.purchasedCosmetics.has(bg.id));
  }},
  { id: 'cosmetic_all_skins', name: 'Коллекционер Скинов', description: 'Купите все скины для кликера (кроме тех, что в разработке).', condition: (state) => {
    const allSkins = initialCosmetics.filter(c => c.type === 'clicker_skin' && c.cost !== 0 && c.cost !== Infinity);
    return allSkins.every(skin => state.purchasedCosmetics.has(skin.id));
  }},
];


interface Particle {
  id: string;
  x: number;
  y: number;
}

const AstralClicker: React.FC = () => {
  const [astralCount, setAstralCount] = useState<number>(0);
  const [astralPerClick, setAstralPerClick] = useState<number>(1);
  const [astralPerSecond, setAstralPerSecond] = useState<number>(0);
  const [purchasedUpgradeLevels, setPurchasedUpgradeLevels] = useState<Map<string, number>>(new Map());
  const [purchasedCosmetics, setPurchasedCosmetics] = useState<Set<string>>(new Set(['bg_default', 'skin_default']));
  const [activeBackground, setActiveBackground] = useState<string>('bg_default');
  const [activeClickerSkin, setActiveClickerSkin] = useState<string>('skin_default');
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  const [clickParticles, setClickParticles] = useState<Particle[]>([]);
  const [fallingCookiesCount, setFallingCookiesCount] = useState<number>(0);

  // Вычисляем текущие характеристики улучшений
  const upgradesWithCurrentStats = initialUpgrades.map(upgradeDef => {
    const level = purchasedUpgradeLevels.get(upgradeDef.id) || 0;
    const currentCost = Math.floor(upgradeDef.baseCost * Math.pow(upgradeDef.costMultiplier, level));
    const currentEffectValue = Math.floor(upgradeDef.baseEffectValue * Math.pow(upgradeDef.effectMultiplier, level));
    return {
      id: upgradeDef.id,
      name: upgradeDef.name,
      description: upgradeDef.description,
      cost: currentCost,
      effect: { type: upgradeDef.type, value: currentEffectValue },
      level: level,
    };
  });

  const handleAstralClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAstralCount((prev) => prev + astralPerClick);

    // Добавляем частицы клика
    const newParticleId = `particle-${Date.now()}-${Math.random()}`;
    setClickParticles((prev) => [
      ...prev,
      { id: newParticleId, x: event.clientX, y: event.clientY },
    ]);
  };

  const handleParticleAnimationEnd = (id: string) => {
    setClickParticles((prev) => prev.filter((p) => p.id !== id));
  };

  const handlePurchaseUpgrade = (upgradeId: string, cost: number, effect: { type: 'click' | 'passive', value: number }) => {
    const upgradeDef = initialUpgrades.find(u => u.id === upgradeId);
    if (!upgradeDef) return;

    const currentLevel = purchasedUpgradeLevels.get(upgradeId) || 0;
    const nextCost = Math.floor(upgradeDef.baseCost * Math.pow(upgradeDef.costMultiplier, currentLevel));

    if (astralCount >= nextCost) {
      setAstralCount((prev) => prev - nextCost);
      setPurchasedUpgradeLevels((prev) => {
        const newMap = new Map(prev);
        newMap.set(upgradeId, currentLevel + 1);
        return newMap;
      });
      showSuccess(`Успешно куплено: ${upgradeDef.name} (Ур. ${currentLevel + 1})!`);
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

  // Эффект для пересчета общего Астрала за клик и Астрала в секунду
  useEffect(() => {
    let totalClickEffect = 0;
    let totalPassiveEffect = 0;

    initialUpgrades.forEach(upgradeDef => {
      const level = purchasedUpgradeLevels.get(upgradeDef.id) || 0;
      if (level > 0) {
        const effectValue = Math.floor(upgradeDef.baseEffectValue * Math.pow(upgradeDef.effectMultiplier, level));
        if (upgradeDef.type === 'click') {
          totalClickEffect += effectValue;
        } else if (upgradeDef.type === 'passive') {
          totalPassiveEffect += effectValue;
        }
      }
    });

    setAstralPerClick(1 + totalClickEffect); // Базовый клик всегда 1
    setAstralPerSecond(totalPassiveEffect);
  }, [purchasedUpgradeLevels]); // Зависимость от Map с уровнями улучшений

  // Пассивная генерация астрала
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (astralPerSecond > 0) {
      interval = setInterval(() => {
        setAstralCount((prev) => prev + astralPerSecond);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [astralPerSecond]);

  // Обновляем количество падающих "печенек" в зависимости от astralPerSecond
  useEffect(() => {
    const maxFallingCookies = 100;
    const newFallingCount = Math.min(astralPerSecond, maxFallingCookies);
    setFallingCookiesCount(newFallingCount);
  }, [astralPerSecond]);

  // Проверка достижений
  useEffect(() => {
    const currentState = {
      astralCount,
      astralPerClick,
      astralPerSecond,
      purchasedUpgradeLevels,
      purchasedCosmetics,
    };

    allAchievements.forEach(achievement => {
      if (!unlockedAchievements.has(achievement.id) && achievement.condition(currentState)) {
        setUnlockedAchievements(prev => {
          const newSet = new Set(prev).add(achievement.id);
          showSuccess(`Достижение разблокировано: "${achievement.name}"!`);
          return newSet;
        });
      }
    });
  }, [astralCount, astralPerClick, astralPerSecond, purchasedUpgradeLevels, purchasedCosmetics, unlockedAchievements]);


  const currentBackgroundValue = initialCosmetics.find(c => c.id === activeBackground)?.value || 'none';
  const currentClickerSkinValue = initialCosmetics.find(c => c.id === activeClickerSkin)?.value || 'https://i.postimg.cc/fRSJZP69/image.jpg';

  const achievementsWithStatus = allAchievements.map(ach => ({
    ...ach,
    unlocked: unlockedAchievements.has(ach.id)
  }));

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row text-gray-100 p-4 transition-all duration-500 ease-in-out relative overflow-hidden"
      style={{
        backgroundImage: currentBackgroundValue !== 'none' ? `url(${currentBackgroundValue})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: currentBackgroundValue === 'none' ? 'black' : 'transparent',
      }}
    >
      {/* Падающие "печеньки" */}
      {Array.from({ length: fallingCookiesCount }).map((_, index) => (
        <FallingCookie
          key={`falling-cookie-${index}`}
          id={`falling-cookie-${index}`}
          initialX={Math.random() * window.innerWidth}
          speed={Math.random() * 2 + 1}
        />
      ))}

      {/* Частицы клика */}
      {clickParticles.map((particle) => (
        <ClickParticle
          key={particle.id}
          id={particle.id}
          startX={particle.x}
          startY={particle.y}
          onComplete={handleParticleAnimationEnd}
        />
      ))}

      {/* Левая секция: Кликер */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:w-1/3 z-10">
        {/* Карточка счетчика Астрала */}
        <Card className="w-full max-w-md bg-gray-800/70 backdrop-blur-sm border-gray-700 shadow-lg rounded-lg p-6 mb-8 text-center">
          <CardTitle className="text-4xl font-bold text-purple-400 mb-2">Астрал: {Math.floor(astralCount)}</CardTitle>
          <p className="text-lg text-gray-300">
            Астрала за клик: {astralPerClick} | Астрала в секунду: {astralPerSecond}
          </p>
        </Card>

        {/* Кнопка клика */}
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

      {/* Правая секция: Улучшения, Косметика, Достижения */}
      <div className="flex-1 p-4 lg:w-2/3 lg:ml-8 z-10">
        <Tabs defaultValue="upgrades" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-800/70 backdrop-blur-sm border-gray-700">
            <TabsTrigger value="upgrades" className="text-lg text-purple-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white">Улучшения</TabsTrigger>
            <TabsTrigger value="cosmetics" className="text-lg text-blue-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Магазин Косметики</TabsTrigger>
            <TabsTrigger value="achievements" className="text-lg text-yellow-300 data-[state=active]:bg-yellow-600 data-[state=active]:text-white">Достижения</TabsTrigger>
          </TabsList>
          <TabsContent value="upgrades">
            <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center lg:text-left">Улучшения</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {upgradesWithCurrentStats.length > 0 ? (
                upgradesWithCurrentStats.map((upgrade) => (
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
          <TabsContent value="achievements">
            <AchievementsList achievements={achievementsWithStatus} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstralClicker;