import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import User from "@/models/userSchema";
import axios from "axios";

export async function POST(request: NextRequest) {
    try {
        await connectDb();
        const { email, query } = await request.json();
        const apiKey = process.env.OPENAI_API_KEY;

        const openAIChatCompletion = async (messages: Array<{ role: string; content: string; }>) => {
      
            try {
              const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  model: 'gpt-3.5-turbo',
                  messages: messages,
                  max_tokens: 100,
                  temperature: 0.7,
                }),
              });
              
              const data = await response.json();
                console.log(data)
              return data.choices[0].message.content;
            } catch (error) {
                console.error('Error:', error);
                return NextResponse.json({ message: "An error occured while getting response." }, {status: 500});
            }
          };
      
          const messages = [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: query }
          ];
      
        const result = await openAIChatCompletion(messages);

        // const result = "bhaijaan aap hume achha lagte ho"
        return NextResponse.json({ message: result }, {status: 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "An error occured while getting response." }, {status: 500});
    }
}