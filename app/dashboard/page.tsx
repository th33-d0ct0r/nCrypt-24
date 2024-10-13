'use client'
import { useUser } from '@clerk/nextjs';
import { PacmanLoader } from 'react-spinners';


export default function Dashboard() {
    const { isLoaded, user } = useUser();

    if (!isLoaded) {
        return (
            <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
                <PacmanLoader className="justify-center items-center" color='#651DFF' />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[100vh]">
            <h1 className="text-3xl font-bold mb-2 text-[#651DFF]">Dashboard</h1>
            <p className="text-[#651DFF]">Welcome {user?.username}!</p>
        </div>
    );
}