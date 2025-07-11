"use client";

import React, { useEffect, useState } from 'react';

interface ClickParticleProps {
  id: string;
  startX: number; // Координата X вьюпорта
  startY: number; // Координата Y вьюпорта
  onComplete: (id: string) => void;
}

const ClickParticle: React.FC<ClickParticleProps> = ({ id, startX, startY, onComplete }) => {
  const [opacity, setOpacity] = useState(1);
  const [transform, setTransform] = useState('translate(-50%, -50%) scale(1)');
  const [top, setTop] = useState(startY);
  const [left, setLeft] = useState(startX);

  useEffect(() => {
    const duration = 800; // ms
    const distance = 80; // px
    const angle = Math.random() * Math.PI * 2; // Случайный угол для направления
    const endX = startX + distance * Math.cos(angle);
    const endY = startY + distance * Math.sin(angle);

    // Устанавливаем начальное положение
    setLeft(startX);
    setTop(startY);
    setOpacity(1);
    setTransform('translate(-50%, -50%) scale(1)');

    // Анимируем после небольшой задержки, чтобы убедиться, что начальное состояние отрисовано
    const animationTimeout = setTimeout(() => {
      setLeft(endX);
      setTop(endY);
      setOpacity(0);
      setTransform('translate(-50%, -50%) scale(0.5)');
    }, 50);

    // Удаляем частицу после завершения анимации
    const removeTimeout = setTimeout(() => {
      onComplete(id);
    }, duration + 100); // Немного дольше, чем продолжительность, чтобы обеспечить полное исчезновение

    return () => {
      clearTimeout(animationTimeout);
      clearTimeout(removeTimeout);
    };
  }, [id, startX, startY, onComplete]);

  return (
    <img
      src="https://i.postimg.cc/fRSJZP69/image.jpg" // Изображение маленькой копии Астрала
      alt="Astral particle"
      className="fixed w-8 h-8 pointer-events-none transition-all ease-out" // Используем fixed для позиционирования относительно вьюпорта
      style={{
        left: left,
        top: top,
        opacity: opacity,
        transform: transform,
        transitionDuration: '800ms',
      }}
    />
  );
};

export default ClickParticle;