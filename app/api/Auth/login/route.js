import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConfig";
import { createSession } from "@/lib/session";
import UserModel from "@/models/user_model";
export async function POST(req) {
    await dbConnect();
    const data = await req.json();
    console.log(data.email);
    console.log(data.password);
    try {
        const user = await UserModel.findOne({
            email: data.email
            
        });
        if (!user) {
            console.log("Email is Incorrect");
            return NextResponse.json({ success: false, message: "Invalid Email" });
        }

        const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

        if (!isPasswordCorrect) {
            console.log("Password is Incorrect");
            return NextResponse.json({ success: false, message: "Incorrect Password" });
        }

        const savedUser = await user.save();
        const UserID = savedUser._id.toString()
        // await createSession(user._id.toString());
        await createSession(savedUser._id)
        
        return NextResponse.json({ success: true, message: "User logged in successfully", data: savedUser });
    } catch (error) {
        console.log("Authorization Error:", error);
        return NextResponse.json(
            { success: false, message: "Server error during login" },
            { status: 500 }
        );
    }
}