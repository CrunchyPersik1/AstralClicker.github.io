"use client";

import React, { useEffect, useState } from 'react';

interface FallingCookieProps {
  id: string;
  initialX: number;
  speed: number;
  imageSrc: string; // Новый пропс для пути к изображению
}

const FallingCookie: React.FC<FallingCookieProps> = ({ id, initialX, speed, imageSrc }) => {
  const [yPos, setYPos] = useState(-50);
  const [xPos, setXPos] = useState(initialX);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let currentY = -50;
    let currentX = initialX;
    let currentRotation = 0;
    const rotationSpeed = (Math.random() - 0.5) * 10;

    const animate = () => {
      currentY += speed;
      currentRotation += rotationSpeed;

      if (currentY > window.innerHeight + 50) {
        currentY = -50;
        currentX = Math.random() * window.innerWidth;
        currentRotation = 0;
      }

      setYPos(currentY);
      setXPos(currentX);
      setRotation(currentRotation);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [id, initialX, speed]);

  return (
    <img
      src={imageSrc}
      alt="Falling Astral"
      className="absolute pointer-events-none"
      style={{
        left: xPos,
        top: yPos,
        width: '30px',
        height: '30px',
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        zIndex: 0,
      }}
    />
  );
};

export default FallingCookie;