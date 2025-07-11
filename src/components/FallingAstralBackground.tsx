"use client";

import React, { useState, useEffect } from 'react';
import FallingCookie from './FallingCookie';

interface FallingAstralBackgroundProps {
  astralPerSecond: number;
  clickerSkinSrc: string;
}

const FallingAstralBackground: React.FC<FallingAstralBackgroundProps> = ({ astralPerSecond, clickerSkinSrc }) => {
  const [fallingCookies, setFallingCookies] = useState<Array<{ id: string; initialX: number; speed: number }>>([]);
  const maxFallingCookiesCap = 100; // Максимальное количество падающих частиц

  useEffect(() => {
    const targetFallingCookies = Math.min(astralPerSecond, maxFallingCookiesCap);
    
    setFallingCookies(prevCookies => {
      const newCookies = [...prevCookies];
      
      // Добавляем новые частицы, если нужно
      while (newCookies.length < targetFallingCookies) {
        newCookies.push({
          id: `bg-cookie-${Date.now()}-${Math.random()}`,
          initialX: Math.random() * window.innerWidth,
          speed: Math.random() * 1 + 0.5,
        });
      }

      // Удаляем лишние частицы, если нужно
      while (newCookies.length > targetFallingCookies) {
        newCookies.pop(); // Удаляем последние, чтобы избежать проблем с ключами
      }

      return newCookies;
    });
  }, [astralPerSecond]); // Зависимость от astralPerSecond

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden z-0">
      {fallingCookies.map((cookie) => (
        <FallingCookie
          key={cookie.id}
          id={cookie.id}
          initialX={cookie.initialX}
          speed={cookie.speed}
          imageSrc={clickerSkinSrc} // Передаем скин кликера
        />
      ))}
    </div>
  );
};

export default FallingAstralBackground;