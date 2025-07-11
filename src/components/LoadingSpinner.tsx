"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[100]">
      <div className="flex flex-col items-center text-white">
        <Loader2 className="h-16 w-16 animate-spin text-purple-400" />
        <p className="mt-4 text-xl font-semibold">Загрузка Астральной Сущности...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;