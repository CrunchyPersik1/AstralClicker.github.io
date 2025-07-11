"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpgradeItem from './UpgradeItem';
import CosmeticShop from './CosmeticShop';
import ClickParticle from './ClickParticle';
import AchievementsList from './AchievementsList';
import { showSuccess, showError } from '@/utils/toast';
import { initialUpgrades, initialCosmetics, allAchievements, UpgradeDefinition, Cosmetic, Achievement } from '@/lib/gameData';


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

  const astralClickerRef = useRef<HTMLDivElement>(null);

  // Вычисляем текущие характеристики улучшений
  const upgradesWithCurrentStats = initialUpgrades.map((upgradeDef) => {
    const level = purchasedUpgradeLevels.get(upgradeDef.id) || 0;
    const currentCost = Math.floor(upgradeDef.baseCost * Math.pow(upgradeDef.costMultiplier, level));
    const currentEffectValue = upgradeDef.baseEffectValue * level;
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

    if (astralClickerRef.current) {
      const containerRect = astralClickerRef.current.getBoundingClientRect();
      const clickX = event.clientX - containerRect.left;
      const clickY = event.clientY - containerRect.top;

      const newParticleId = `particle-${Date.now()}-${Math.random()}`;
      setClickParticles((prev) => [
        ...prev,
        { id: newParticleId, x: clickX, y: clickY },
      ]);
    }
  };

  const handleParticleAnimationEnd = (id: string) => {
    setClickParticles((prev) => prev.filter((p) => p.id !== id));
  };

  const handlePurchaseUpgrade = (upgradeId: string, cost: number, effect: { type: 'click' | 'passive', value: number }) => {
    const upgradeDef = initialUpgrades.find(u => u.id === upgradeId);
    if (!upgradeDef) return;

    const currentLevel = purchasedUpgradeLevels.get(upgradeDef.id) || 0;
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

  useEffect(() => {
    let totalClickEffect = 0;
    let totalPassiveEffect = 0;

    initialUpgrades.forEach(upgradeDef => {
      const level = purchasedUpgradeLevels.get(upgradeDef.id) || 0;
      if (level > 0) {
        const effectValue = upgradeDef.baseEffectValue * level; 
        if (upgradeDef.type === 'click') {
          totalClickEffect += effectValue;
        } else if (upgradeDef.type === 'passive') {
          totalPassiveEffect += effectValue;
        }
      }
    });

    setAstralPerClick(1 + totalClickEffect);
    setAstralPerSecond(totalPassiveEffect);
  }, [purchasedUpgradeLevels]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (astralPerSecond > 0) {
      interval = setInterval(() => {
        setAstralCount((prev) => prev + astralPerSecond);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [astralPerSecond]);

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
      ref={astralClickerRef}
      className="min-h-screen flex flex-col lg:flex-row text-gray-100 p-4 transition-all duration-500 ease-in-out relative"
      style={{
        backgroundImage: currentBackgroundValue !== 'none' ? `url(${currentBackgroundValue})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: currentBackgroundValue === 'none' ? 'black' : 'transparent',
      }}
    >
      {clickParticles.map((particle) => (
        <ClickParticle
          key={particle.id}
          id={particle.id}
          startX={particle.x}
          startY={particle.y}
          onComplete={handleParticleAnimationEnd}
        />
      ))}

      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:w-1/3 z-10">
        <Card className="w-full max-w-md bg-gray-800/70 backdrop-blur-sm border-gray-700 shadow-lg rounded-lg p-6 mb-8 text-center">
          <CardTitle className="text-4xl font-bold text-purple-400 mb-2">Астрал: {Math.floor(astralCount)}</CardTitle>
          <p className="text-lg text-gray-300">
            Астрала за клик: {astralPerClick} | Астрала в секунду: {astralPerSecond}
          </p>
        </Card>

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