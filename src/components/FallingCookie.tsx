"use client";

import React, { useEffect, useState, useRef } from 'react';

interface FallingCookieProps {
  id: string;
  initialX: number; // Координата X вьюпорта
  speed: number; // Пикселей за кадр
}

const FallingCookie: React.FC<FallingCookieProps> = ({ id, initialX, speed }) => {
  const [y, setY] = useState(Math.random() * -window.innerHeight); // Начинаем за пределами экрана на случайной Y
  const x = useRef(initialX); // Позиция X фиксирована для этого экземпляра

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setY((prevY) => {
        let newY = prevY + speed;
        if (newY > window.innerHeight + 50) { // +50, чтобы убедиться, что полностью за экраном
          // Сбрасываем наверх и рандомизируем X, когда уходит за экран
          newY = -50; // Начинаем немного выше верхней границы
          x.current = Math.random() * window.innerWidth;
        }
        return newY;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed]);

  return (
    <img
      src="https://i.postimg.cc/fRSJZP69/image.jpg" // Изображение маленькой копии Астрала
      alt="Falling astral"
      className="fixed w-10 h-10 pointer-events-none" // Используем fixed для позиционирования относительно вьюпорта
      style={{
        left: x.current,
        top: y,
      }}
    />
  );
};

export default FallingCookie;