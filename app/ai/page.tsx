'use client'
import React, {useState} from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useUser } from '@clerk/nextjs';
import { PacmanLoader } from 'react-spinners';

const AI = () => {
    const [query, setQuery] = useState('')
    const [response, setResponse] = useState('')
    const { user, isLoaded } = useUser()

    if (!isLoaded) {
        return (
            <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
                <PacmanLoader className="justify-center items-center" color='#651DFF' />
            </div>
        );
    }

    const handleFormSubmit = (e: React.MouseEvent) => {
        e.preventDefault()
        setResponse("Thinking... 🤔")
        
        fetch('/api/ai', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress, query: query }),
        }).then((res) => res.json())
        .then((data) => {
            setResponse(data.message)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="flex flex-col items-center p-[8vw] min-h-[100vh]">
        <h1 className="text-2xl text-center mt-[7vh] mb-[3vh]">Welcome to ExoAssist</h1>
            <div className="flex flex-col items-center justify-center w-[100%] gap-y-4">
                <Input name="query" classes="w-[100%]" type='text' value={query} callback={(e) => setQuery(e.target.value)} />
                <Button classes="w-[100%]" onClickEvent={(e) => handleFormSubmit(e)} >Submit</Button>
            </div>
            {response ? (
                <p className='mt-10'>{response}</p>
            ) : (
                <p className='mt-10'>Type your query to see the response 😄</p>
            )}
        </div>
    )
}

export default AI