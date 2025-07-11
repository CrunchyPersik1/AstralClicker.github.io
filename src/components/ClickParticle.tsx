"use client";

import React, { useEffect, useState } from 'react';

interface ClickParticleProps {
  id: string;
  startX: number;
  startY: number;
  onComplete: (id: string) => void;
}

const ClickParticle: React.FC<ClickParticleProps> = ({ id, startX, startY, onComplete }) => {
  const [position, setPosition] = useState({ x: startX, y: startY });
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState('');

  useEffect(() => {
    const colors = ['#FFD700', '#FFA500', '#FF4500', '#FF6347', '#FF1493', '#EE82EE', '#DA70D6', '#8A2BE2', '#4169E1', '#00BFFF', '#00CED1', '#00FA9A', '#7CFC00', '#ADFF2F', '#FFFF00'];
    setColor(colors[Math.floor(Math.random() * colors.length)]);

    const animationDuration = 800; // ms
    const fadeOutDelay = 200; // ms before fading starts

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / animationDuration;

      if (progress < 1) {
        // Move upwards and slightly outwards
        const newY = startY - (progress * 100); // Move up 100px
        const newX = startX + (Math.sin(progress * Math.PI * 2) * 20); // Slight horizontal wiggle

        // Fade out
        let newOpacity = 1;
        if (elapsed > fadeOutDelay) {
          newOpacity = 1 - ((elapsed - fadeOutDelay) / (animationDuration - fadeOutDelay));
        }

        // Scale up slightly
        const newScale = 1 + (progress * 0.5);

        setPosition({ x: newX, y: newY });
        setOpacity(newOpacity);
        setScale(newScale);
        requestAnimationFrame(animate);
      } else {
        onComplete(id);
      }
    };

    requestAnimationFrame(animate);
  }, [id, startX, startY, onComplete]);

  return (
    <div
      className="absolute pointer-events-none text-xl font-bold select-none"
      style={{
        left: position.x,
        top: position.y,
        opacity: opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
        color: color,
        textShadow: '0 0 5px rgba(255,255,255,0.7)',
        zIndex: 9999,
      }}
    >
      +{Math.floor(Math.random() * 5) + 1}
    </div>
  );
};

export default ClickParticle;