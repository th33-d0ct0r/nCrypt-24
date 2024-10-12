'use client'
import { useUser } from '@clerk/nextjs';
import { PacmanLoader } from 'react-spinners';
import { useState, useEffect } from 'react';

interface Position {
    latitude: number | null;
    longitude: number | null;
  }
  
  const useGeolocation = () => {
    const [position, setPosition] = useState<Position>({ latitude: null, longitude: null });
    const [isMoving, setIsMoving] = useState<boolean>(false);
    const [lastPosition, setLastPosition] = useState<Position | null>(null);
    const movementThreshold = 0.0001; // Adjust based on sensitivity
  
    useEffect(() => {
      const handleSuccess = (pos: GeolocationPosition) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ latitude, longitude });
  
        if (lastPosition) {
          const distance = getDistance(
            //@ts-ignore
            lastPosition.latitude,
            lastPosition.longitude,
            latitude,
            longitude
          );
          setIsMoving(distance > movementThreshold);
        }
  
        setLastPosition({ latitude, longitude });
      };
  
      const handleError = (err: GeolocationPositionError) => {
        console.error(err);
      };
  
      const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      });
  
      return () => {
        navigator.geolocation.clearWatch(watchId); // Pass the watchId here
      };
    }, [lastPosition]);
  
    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const R = 6371e3; // meters
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  
      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
      return R * c; // Distance in meters
    };
  
    return { position, isMoving };
  };  
  

export default function Dashboard() {
    const { position, isMoving } = useGeolocation();
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
            <h1>GPS Movement Detection</h1>
            <p>
                Latitude: {position.latitude !== null ? position.latitude.toFixed(6) : 'N/A'}
            </p>
            <p>
                Longitude: {position.longitude !== null ? position.longitude.toFixed(6) : 'N/A'}
            </p>
            <h2>{isMoving ? 'Person is moving' : 'Person is stationary'}</h2>
        </div>
    );
}