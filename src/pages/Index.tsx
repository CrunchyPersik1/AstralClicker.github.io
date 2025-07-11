"use client";

import AstralClicker from "@/components/AstralClicker";
import { MadeWithDyad } from "@/components/made-with-dyad";
import FallingAstralBackground from "@/components/FallingAstralBackground"; // Новый импорт

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <FallingAstralBackground /> {/* Рендерим фоновые частицы здесь */}
      <AstralClicker />
      <MadeWithDyad />
    </div>
  );
};

export default Index;