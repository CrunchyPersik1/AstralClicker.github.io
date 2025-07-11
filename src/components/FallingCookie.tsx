"use client";

import React, { useEffect, useState } from 'react';

interface FallingCookieProps {
  id: string;
  initialX: number;
  speed: number;
}

const FallingCookie: React.FC<FallingCookieProps> = ({ id, initialX, speed }) => {
  const [yPos, setYPos] = useState(-50); // Start above the screen
  const [xPos, setXPos] = useState(initialX);
  const [rotation, setRotation] = useState(0);

  const imageSrc = 'https://i.postimg.cc/fRSJZP69/image.jpg'; // Используем тот же скин астрала

  useEffect(() => {
    let animationFrameId: number;
    let currentY = -50; // Use a local variable for current position
    let currentX = initialX;
    let currentRotation = 0;
    const rotationSpeed = (Math.random() - 0.5) * 10; // Random rotation speed for each particle

    const animate = () => {
      currentY += speed;
      currentRotation += rotationSpeed;

      if (currentY > window.innerHeight + 50) {
        // Reset position to top for continuous falling
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

    // Cleanup function to cancel the animation frame when the component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [id, initialX, speed]); // Dependencies should only be props that define the particle's initial behavior

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
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`, // Center the image and apply rotation
        zIndex: 0, // Behind other elements
      }}
    />
  );
};

export default FallingCookie;