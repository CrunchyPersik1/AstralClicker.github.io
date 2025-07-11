"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import MilkClicker from "@/components/MilkClicker"; // Импортируем MilkClicker

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MilkClicker />
      <MadeWithDyad />
    </div>
  );
};

export default Index;