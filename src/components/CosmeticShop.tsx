"use client";

import React from 'react';
import CosmeticItem from './CosmeticItem';

interface Cosmetic {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'background' | 'clicker_skin';
  value: string;
}

const initialCosmetics: Cosmetic[] = [
  // Backgrounds
  { id: 'bg_default', name: 'Стандартный Фон', description: 'Базовый фон игры.', cost: 0, type: 'background', value: 'none' }, // Default background
  { id: 'bg_stars', name: 'Звездное Поле', description: 'Мерцающее поле далеких звезд.', cost: 1000, type: 'background', value: 'https://i.postimg.cc/pr211111/stars.jpg' },
  { id: 'bg_galaxy', name: 'Галактическое Сердце', description: 'Пульсирующая галактика в центре вселенной.', cost: 50000, type: 'background', value: 'https://i.postimg.cc/pr211111/galaxy.jpg' },
  { id: 'bg_nebula', name: 'Туманность Омега', description: 'Яркие цвета космической туманности.', cost: 250000, type: 'background', value: 'https://i.postimg.cc/pr211111/nebula.jpg' },
  { id: 'bg_void', name: 'Квантовая Пустота', description: 'Глубокая и таинственная пустота.', cost: 1000000, type: 'background', value: 'https://i.postimg.cc/pr211111/void.jpg' },
  { id: 'bg_multiverse', name: 'Мультивселенский Коллапс', description: 'Вихрь реальностей, сливающихся воедино.', cost: 1500000000, type: 'background', value: 'https://i.postimg.cc/pr211111/multiverse.jpg' },

  // Clicker Skins
  { id: 'skin_default', name: 'Базовый Астрал', description: 'Стандартный вид Астральной сущности.', cost: 0, type: 'clicker_skin', value: 'https://i.postimg.cc/fRSJZP69/image.jpg' }, // Default clicker skin
  { id: 'skin_radiant', name: 'Сияющий Астрал', description: 'Астрал, излучающий мощную энергию.', cost: 5000, type: 'clicker_skin', value: 'https://i.postimg.cc/pr211111/radiant_astral.jpg' },
  { id: 'skin_ancient', name: 'Древний Артефакт', description: 'Загадочный артефакт, хранящий древние секреты.', cost: 100000, type: 'clicker_skin', value: 'https://i.postimg.cc/pr211111/ancient_artifact.jpg' },
  { id: 'skin_cosmic_egg', name: 'Космическое Яйцо', description: 'Источник новой вселенной.', cost: 5000000, type: 'clicker_skin', value: 'https://i.postimg.cc/pr211111/cosmic_egg.jpg' },
];

interface CosmeticShopProps {
  currentAstral: number;
  purchasedCosmetics: Set<string>;
  activeBackground: string | null;
  activeClickerSkin: string | null;
  onPurchaseCosmetic: (cosmeticId: string, cost: number) => void;
  onApplyCosmetic: (cosmetic: Cosmetic) => void;
}

const CosmeticShop: React.FC<CosmeticShopProps> = ({
  currentAstral,
  purchasedCosmetics,
  activeBackground,
  activeClickerSkin,
  onPurchaseCosmetic,
  onApplyCosmetic,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center lg:text-left">Магазин Косметики</h2>

      <h3 className="text-2xl font-semibold text-blue-300 mb-4">Фоны</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {initialCosmetics
          .filter(c => c.type === 'background')
          .map((cosmetic) => (
            <CosmeticItem
              key={cosmetic.id}
              cosmetic={cosmetic}
              currentAstral={currentAstral}
              isPurchased={purchasedCosmetics.has(cosmetic.id)}
              isActive={activeBackground === cosmetic.id}
              onPurchase={onPurchaseCosmetic}
              onApply={onApplyCosmetic}
            />
          ))}
      </div>

      <h3 className="text-2xl font-semibold text-blue-300 mb-4">Скины для Кликера</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialCosmetics
          .filter(c => c.type === 'clicker_skin')
          .map((cosmetic) => (
            <CosmeticItem
              key={cosmetic.id}
              cosmetic={cosmetic}
              currentAstral={currentAstral}
              isPurchased={purchasedCosmetics.has(cosmetic.id)}
              isActive={activeClickerSkin === cosmetic.id}
              onPurchase={onPurchaseCosmetic}
              onApply={onApplyCosmetic}
            />
          ))}
      </div>
    </div>
  );
};

export default CosmeticShop;