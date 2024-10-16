import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import School from "@/models/schoolSchema";

export async function POST(request: NextRequest) {
    try {
        await connectDb();

        const {
            schoolName,
            address,
            teamName,
            StudentInchargeName,
            TeacherInchargeName,
            TeacherInchargeEmail,
            email
        } = await request.json();

        const newSchool = new School({
            schoolName,
            address,
            teamName,
            StudentInchargeName,
            TeacherInchargeName,
            TeacherInchargeEmail,
            team: [email],
        });

        await newSchool.save();

        return NextResponse.json({ message: "School created", user: newSchool }, {status: 201});

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occured while saving school." }, {status: 500});        
    }
}