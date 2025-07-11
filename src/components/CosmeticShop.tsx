"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initialCosmetics, Cosmetic } from '@/lib/gameData';

interface CosmeticShopProps {
  currentAstral: number;
  purchasedCosmetics: Set<string>;
  activeBackground: string;
  activeClickerSkin: string;
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
  const backgrounds = initialCosmetics.filter(c => c.type === 'background');
  const clickerSkins = initialCosmetics.filter(c => c.type === 'clicker_skin');

  const CosmeticItem: React.FC<{ cosmetic: Cosmetic }> = ({ cosmetic }) => {
    const isPurchased = purchasedCosmetics.has(cosmetic.id);
    const canPurchase = currentAstral >= cosmetic.cost && !isPurchased;
    const isActive = (cosmetic.type === 'background' && cosmetic.id === activeBackground) ||
                     (cosmetic.type === 'clicker_skin' && cosmetic.id === activeClickerSkin);

    return (
      <Card className={`bg-gray-700/70 backdrop-blur-sm border-gray-600 text-gray-100 ${isActive ? 'border-2 border-blue-500' : ''}`}>
        <CardHeader>
          <CardTitle className="text-blue-300">{cosmetic.name}</CardTitle>
          <CardDescription className="text-gray-300">{cosmetic.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {cosmetic.value !== 'none' && (
            <div className="w-full h-24 mb-4 rounded-md overflow-hidden flex items-center justify-center bg-gray-800">
              {cosmetic.type === 'background' ? (
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${cosmetic.value})` }}
                ></div>
              ) : (
                <img src={cosmetic.value} alt={cosmetic.name} className="max-w-full max-h-full object-contain" />
              )}
            </div>
          )}
          <p className="text-lg font-semibold">
            Стоимость: {cosmetic.cost === 0 ? 'Бесплатно' : cosmetic.cost === Infinity ? 'В разработке' : `${cosmetic.cost} Астрала`}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {!isPurchased ? (
            <Button
              onClick={() => onPurchaseCosmetic(cosmetic.id, cosmetic.cost)}
              disabled={!canPurchase || cosmetic.cost === Infinity}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {cosmetic.cost === Infinity ? 'В разработке' : canPurchase ? 'Купить' : `Недостаточно Астрала (${cosmetic.cost})`}
            </Button>
          ) : (
            <Button
              onClick={() => onApplyCosmetic(cosmetic)}
              disabled={isActive}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {isActive ? 'Применено' : 'Применить'}
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center lg:text-left">Магазин Косметики</h2>
      <Tabs defaultValue="backgrounds" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-800/70 backdrop-blur-sm border-gray-700">
          <TabsTrigger value="backgrounds" className="text-lg text-blue-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Фоны</TabsTrigger>
          <TabsTrigger value="skins" className="text-lg text-blue-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Скины Кликера</TabsTrigger>
        </TabsList>
        <TabsContent value="backgrounds">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {backgrounds.map(cosmetic => (
              <CosmeticItem key={cosmetic.id} cosmetic={cosmetic} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="skins">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {clickerSkins.map(cosmetic => (
              <CosmeticItem key={cosmetic.id} cosmetic={cosmetic} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CosmeticShop;