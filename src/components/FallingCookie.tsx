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
  const [opacity, setOpacity] = useState(1);

  const imageSrc = 'https://i.postimg.cc/fRSJZP69/image.jpg'; // Используем тот же скин астрала

  useEffect(() => {
    const animationDuration = (window.innerHeight + 100) / (speed * 50); // Adjust speed for visual effect
    const startTime = Date.now();
    const initialRotationSpeed = (Math.random() - 0.5) * 10; // Random rotation speed

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / (animationDuration * 1000); // Convert to seconds

      if (yPos < window.innerHeight + 50) { // Stop when off-screen
        setYPos(prevY => prevY + speed);
        setRotation(prevRot => prevRot + initialRotationSpeed);
        requestAnimationFrame(animate);
      } else {
        // Reset position to top for continuous falling
        setYPos(-50);
        setXPos(Math.random() * window.innerWidth);
        setRotation(0);
        setOpacity(1);
        // Restart animation
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [id, initialX, speed, yPos]); // Add yPos to dependencies to re-trigger when it goes off-screen

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
        opacity: opacity,
        transform: `rotate(${rotation}deg)`,
        zIndex: 0, // Behind other elements
      }}
    />
  );
};

export default FallingCookie;