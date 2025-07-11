"use client";

import React, { useState, useEffect, useRef } from 'react';
import AstralClicker from "@/components/AstralClicker";
import { MadeWithDyad } from "@/components/made-with-dyad";
import FallingAstralBackground from "@/components/FallingAstralBackground";
import { showSuccess, showError } from '@/utils/toast';
import { initialUpgrades, initialCosmetics, allAchievements, UpgradeDefinition, Cosmetic, Achievement } from '@/lib/gameData';

const Index = () => {
  const [astralCount, setAstralCount] = useState<number>(0);
  const [astralPerClick, setAstralPerClick] = useState<number>(1);
  const [astralPerSecond, setAstralPerSecond] = useState<number>(0);
  const [purchasedUpgradeLevels, setPurchasedUpgradeLevels] = useState<Map<string, number>>(() => new Map());
  const [purchasedCosmetics, setPurchasedCosmetics] = useState<Set<string>>(() => new Set(['bg_default', 'skin_default']));
  const [activeBackground, setActiveBackground] = useState<string>('bg_default');
  const [activeClickerSkin, setActiveClickerSkin] = useState<string>('skin_default');
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(() => new Set());

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

  // Эффект для пересчета общего Астрала за клик и Астрала в секунду
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

    setAstralPerClick(1 + totalClickEffect); // Базовый клик всегда 1
    setAstralPerSecond(totalPassiveEffect);
  }, [purchasedUpgradeLevels]);

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

  // Вычисляем achievementsWithStatus здесь
  const achievementsWithStatus = allAchievements.map(ach => {
    return {
      ...ach,
      unlocked: unlockedAchievements.has(ach.id)
    };
  });

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: currentBackgroundValue !== 'none' ? `url(${currentBackgroundValue})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: currentBackgroundValue === 'none' ? 'black' : 'transparent',
      }}
    >
      <FallingAstralBackground astralPerSecond={astralPerSecond} clickerSkinSrc={currentClickerSkinValue} />
      <AstralClicker
        astralCount={astralCount}
        setAstralCount={setAstralCount}
        astralPerClick={astralPerClick}
        astralPerSecond={astralPerSecond}
        purchasedUpgradeLevels={purchasedUpgradeLevels}
        setPurchasedUpgradeLevels={setPurchasedUpgradeLevels}
        purchasedCosmetics={purchasedCosmetics}
        setPurchasedCosmetics={setPurchasedCosmetics}
        activeBackground={activeBackground}
        setActiveBackground={setActiveBackground}
        activeClickerSkin={activeClickerSkin}
        setActiveClickerSkin={setActiveClickerSkin}
        unlockedAchievements={unlockedAchievements}
        setUnlockedAchievements={setUnlockedAchievements}
        upgradesWithCurrentStats={upgradesWithCurrentStats}
        currentClickerSkinValue={currentClickerSkinValue}
        achievementsWithStatus={achievementsWithStatus}
      />
      <MadeWithDyad />
    </div>
  );
};

export default Index;