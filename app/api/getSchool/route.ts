import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import School from "@/models/schoolSchema";
import User from "@/models/userSchema";

export async function POST(request: NextRequest) {
    try {
        await connectDb();

        const { email } = await request.json();
        const existingUser = await User.findOne({ email : email });
        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, {status: 400});
        }
        const existingSchool = await School.findOne({ _id: existingUser.schoolId });

        if (!existingSchool) {
            return NextResponse.json({ message: "School not found" }, {status: 400});
        }
        return NextResponse.json({ message: "School found", school: existingSchool }, {status: 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "An error occured while fetching user." }, {status: 500});
    }
}