'use client'
import { useUser } from '@clerk/nextjs';
import { PacmanLoader } from 'react-spinners';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { Notyf } from 'notyf';
import Button from '@/components/Button';
import BtnLink from '@/components/BtnLink'

interface MongoUser {
    email: string;
    clerkId: string;
    name: string;
}

export default function MapPage() {
    const { isLoaded, user } = useUser();
    const router = useRouter()
    const [mongoUser, setMongoUser] = useState({} as MongoUser);
    const [mongoUserLoading, setMongoUserLoading] = useState(true);
    const notyf = new Notyf();
    console.log('Loaded', isLoaded)

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
            console.log(data)
            if (data.mongoUser) {
                setMongoUserLoading(false);
                setMongoUser(data.mongoUser);
            } else {
                notyf.error('An error occured while fetching user.');
                setMongoUserLoading(false);
                return router.push('/sign-in');
            }
        });
    }, [isLoaded, user]);

    if (!isLoaded || mongoUserLoading) {
        return (
            <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
                <PacmanLoader className="justify-center items-center" color='#651DFF' />
            </div>
        );
    }
    return (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
            <BtnLink href="/map/scan">Scan Live Location</BtnLink>
        </div>
        // <img src="map.png" className='w-[100vw] h-[100vh] object-contain' />
    );
}