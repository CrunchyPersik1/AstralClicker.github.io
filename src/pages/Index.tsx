"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import AstralClicker from "@/components/AstralClicker"; // Импортируем AstralClicker

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AstralClicker />
      <MadeWithDyad />
    </div>
  );
};

export default Index;