import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import User from "@/models/userSchema";
import axios from "axios";

export async function POST(request: NextRequest) {
    try {
        await connectDb();
        const { email, query } = await request.json();
        const reqUser = await User.findOne({ email });

        const apiKey = process.env.OPENAI_API_KEY;

        const response = await axios.post(
            'https://jamsapi.hackclub.dev/openai/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: `You are a friend to the user named ${reqUser.name}.` },
                    { role: 'user', content: query }
                ],
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const result = response.data.choices[0].message.content;

        // const result = "bhaijaan aap hume achha lagte ho"
        return NextResponse.json({ message: result }, {status: 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "An error occured while getting response." }, {status: 500});
    }
}