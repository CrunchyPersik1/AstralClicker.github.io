"use client";

import React, { useEffect, useState } from 'react';

interface ClickParticleProps {
  id: string;
  startX: number;
  startY: number;
  onComplete: (id: string) => void;
  imageSrc: string; // Новый пропс для пути к изображению
}

const ClickParticle: React.FC<ClickParticleProps> = ({ id, startX, startY, onComplete, imageSrc }) => {
  const [position, setPosition] = useState({ x: startX, y: startY });
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(0.5); // Начальный размер, чтобы выглядело как "маленькая копия"
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const animationDuration = 1200;
    const fadeOutDelay = 400;
    const rotationSpeed = (Math.random() - 0.5) * 360; // Случайная скорость вращения

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / animationDuration;

      if (progress < 1) {
        const newY = startY - (progress * 100);
        const newX = startX + (Math.sin(progress * Math.PI * 2) * 20);
        
        let newOpacity = 1;
        if (elapsed > fadeOutDelay) {
          newOpacity = 1 - ((elapsed - fadeOutDelay) / (animationDuration - fadeOutDelay));
        }

        const newScale = 0.5 + (progress * 0.5); // Увеличение от 0.5 до 1
        const newRotation = rotationSpeed * progress;

        setPosition({ x: newX, y: newY });
        setOpacity(newOpacity);
        setScale(newScale);
        setRotation(newRotation);
        requestAnimationFrame(animate);
      } else {
        onComplete(id);
      }
    };

    requestAnimationFrame(animate);
  }, [id, startX, startY, onComplete, imageSrc]);

  return (
    <img
      src={imageSrc}
      alt="Astral Particle"
      className="absolute pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        opacity: opacity,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
        width: '40px', // Размер частицы
        height: '40px',
        zIndex: 9999,
      }}
    />
  );
};

export default ClickParticle;