"use client";

import React, { useState, useEffect } from 'react';
import FallingCookie from './FallingCookie';

const FallingAstralBackground: React.FC = () => {
  const [fallingCookies, setFallingCookies] = useState<Array<{ id: string; initialX: number; speed: number }>>([]);
  const maxFallingCookies = 50; // Количество падающих частиц для фонового эффекта

  useEffect(() => {
    // Инициализация фиксированного количества падающих частиц
    const initialCookies = Array.from({ length: maxFallingCookies }).map((_, index) => ({
      id: `bg-cookie-${index}-${Date.now()}`,
      initialX: Math.random() * window.innerWidth,
      speed: Math.random() * 1 + 0.5, // Более медленное и тонкое падение
    }));
    setFallingCookies(initialCookies);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden z-0">
      {fallingCookies.map((cookie) => (
        <FallingCookie
          key={cookie.id}
          id={cookie.id}
          initialX={cookie.initialX}
          speed={cookie.speed}
        />
      ))}
    </div>
  );
};

export default FallingAstralBackground;