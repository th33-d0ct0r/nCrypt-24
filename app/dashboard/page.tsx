'use client'
import { useUser } from '@clerk/nextjs';
import { PacmanLoader } from 'react-spinners';
import { useState, useEffect } from 'react';

const useDeviceMotion = () => {
    const [motion, setMotion] = useState({ x: 0, y: 0, z: 0 });
    const [isWalking, setIsWalking] = useState(false);
    const [previousTimestamp, setPreviousTimestamp] = useState(Date.now());
  
    useEffect(() => {
        //@ts-ignore
      const handleMotion = (event) => {
        const { accelerationIncludingGravity } = event;
        const { x, y, z } = accelerationIncludingGravity;
  
        const currentTimestamp = Date.now();
        const timeDiff = currentTimestamp - previousTimestamp;
        setPreviousTimestamp(currentTimestamp);
  
        const threshold = 0.2; // Adjust this threshold based on sensitivity
        const accelerationMagnitude = Math.sqrt(x * x + y * y + z * z);
  
        if (accelerationMagnitude > threshold) {
          setIsWalking(true);
        } else {
          setIsWalking(false);
        }
  
        setMotion({ x, y, z });
      };
  
      window.addEventListener('devicemotion', handleMotion);
  
      return () => {
        window.removeEventListener('devicemotion', handleMotion);
      };
    }, [previousTimestamp]);
  
    return { motion, isWalking };
  };
  

export default function Dashboard() {
    const { motion, isWalking } = useDeviceMotion();
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
            <h2>{isWalking ? 'Person is walking' : 'Person is stationary'}</h2>
        </div>
    );
}