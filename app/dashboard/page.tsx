'use client'
import { useUser } from '@clerk/nextjs';
import { PacmanLoader } from 'react-spinners';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Notyf } from 'notyf';

interface MongoUser {
    email: string;
    clerkId: string;
    name: string;
}

export default function Dashboard() {
    const { isLoaded, user } = useUser();
    const router = useRouter()
    const [mongoUser, setMongoUser] = useState({} as MongoUser);
    const [mongoUserLoading, setMongoUserLoading] = useState(true);
    const notyf = new Notyf();

    useEffect(() => {
        if (!isLoaded) return;

        fetch ('/api/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
        }).then((res) => res.json())
        .then((data) => {
            if (data.mongoUser) {
                setMongoUser(data.mongoUser);
            } else {
                notyf.error('An error occured while fetching user.');
                setMongoUserLoading(false);
                return router.push('/sign-in');
            }
        });
    }, [isLoaded, user]);

    if (!user) {
        return router.push('/sign-in');
    }

    if (!isLoaded || !mongoUserLoading) {
        return (
            <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
                <PacmanLoader className="justify-center items-center" color='#651DFF' />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center p-[10vw] min-h-[100vh]">
            <div className="flex flex-col w-[100%] items-start">
                <h1 className="text-[#fff] mt-[7vh] mb-0 font-semibold text-2xl">Hello {mongoUser?.name?.split(' ')[0]}!</h1>
                <p className='text-sm'>Register your team for the event</p>
            </div>

            <img src="/illus.png" className="w-[100%] mt-[5vh]" alt="" />

            <p className="text-xs mt-[5vh]">
                Welcome to Exogenesis 2024, where tech meets entertainment in an immersive experience across two dynamic venues. Enjoy seamless digital access, interactive activities, exclusive tech innovations, live concerts, gaming booths, AR adventures, and smart payment systems. Dive into the future of creativity and technology!
            </p>

            <button className="bg-[#651DFF] w-[100%] mt-[3vh] text-white p-2 rounded-full text-xl h-[7vh]">Register</button>
        </div>
    );
}