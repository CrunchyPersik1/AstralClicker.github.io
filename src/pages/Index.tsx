"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import AstralClicker from "@/components/MilkClicker"; // Импортируем AstralClicker (переименован из MilkClicker)

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AstralClicker />
      <MadeWithDyad />
    </div>
  );
};

export default Index;