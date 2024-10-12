'use client'
import { useUser } from '@clerk/nextjs';
import { PacmanLoader } from 'react-spinners';
import { useState, useEffect } from 'react';

const useDeviceMotion = () => {
    const [motion, setMotion] = useState({ x: 0, y: 0, z: 0 });
    const [isMoving, setIsMoving] = useState(false);
    const [movementHistory, setMovementHistory] = useState([]); // Store past motion values
    const [prevAcceleration, setPrevAcceleration] = useState({ x: 0, y: 0, z: 0 }); // Previous acceleration values

    useEffect(() => {
        //@ts-ignore
        const handleMotion = (event) => {
          const { accelerationIncludingGravity } = event;
          const { x, y, z } = accelerationIncludingGravity;
      
          // High-pass filter to remove gravity
          const alpha = 0.8; // Smoothing factor
          const filteredX = alpha * (prevAcceleration.x + x - prevAcceleration.x);
          const filteredY = alpha * (prevAcceleration.y + y - prevAcceleration.y);
          const filteredZ = alpha * (prevAcceleration.z + z - prevAcceleration.z);
      
          setPrevAcceleration({ x: filteredX, y: filteredY, z: filteredZ });
      
          const accelerationMagnitude = Math.sqrt(filteredX * filteredX + filteredY * filteredY + filteredZ * filteredZ);
          const threshold = 3; // Higher threshold to reduce sensitivity
      
          setMotion({ x: filteredX, y: filteredY, z: filteredZ });
      
          //@ts-ignore
          setMovementHistory((prev) => {
            const newHistory = [...prev, accelerationMagnitude].slice(-10); // Keep last 10 readings
      
            // Calculate average movement
            const averageMovement = newHistory.reduce((sum, val) => sum + val, 0) / newHistory.length;
      
            // Set moving state based on average movement
            setIsMoving(averageMovement > threshold);
      
            return newHistory;
          });
        };
  
      window.addEventListener('devicemotion', handleMotion);
  
      return () => {
        window.removeEventListener('devicemotion', handleMotion);
      };
    }, [prevAcceleration]);
  
    return { motion, isMoving };
  };
  
  

export default function Dashboard() {
  const { motion, isMoving } = useDeviceMotion();
    const { isLoaded, user } = useUser();

    if (!isLoaded) {
        return (
            <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
                <PacmanLoader className="justify-center items-center" color='#FF5631' />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[100vh]">
            <h1 className="text-3xl font-bold mb-2 text-[#FF5631]">Dashboard</h1>
            <p className="text-[#FF5631]">Welcome {user?.username}!</p>
            <h1>Device Motion</h1>
            <p>X: {motion?.x ? motion.x.toFixed(2) : '0.00'}</p>
            <p>Y: {motion?.y ? motion.y.toFixed(2) : '0.00'}</p>
            <p>Z: {motion?.z ? motion.z.toFixed(2) : '0.00'}</p>
            <h2>{isMoving ? 'Person is moving' : 'Person is stationary'}</h2>
        </div>
    );
}