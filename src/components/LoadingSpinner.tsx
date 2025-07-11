"use client";

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  isFadingOut: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isFadingOut }) => {
  const [currentOpacity, setCurrentOpacity] = useState(0); // Начинаем с 0 для эффекта появления

  useEffect(() => {
    // Плавное появление при монтировании компонента
    const fadeInTimer = setTimeout(() => {
      setCurrentOpacity(1);
    }, 50); // Небольшая задержка, чтобы убедиться, что CSS-переход применяется

    return () => clearTimeout(fadeInTimer);
  }, []);

  useEffect(() => {
    // Плавное исчезновение, когда isFadingOut становится true
    if (isFadingOut) {
      setCurrentOpacity(0);
    }
  }, [isFadingOut]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[100] transition-opacity duration-500"
      style={{ opacity: currentOpacity }} // Управляем прозрачностью через стиль
    >
      <div className="flex flex-col items-center text-white">
        <Loader2 className="h-16 w-16 animate-spin text-purple-400" />
        <p className="mt-4 text-xl font-semibold">Загрузка Астральной Сущности...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;