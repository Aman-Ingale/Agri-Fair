import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user_model";
export async function POST(req){
  await dbConnect();
  const data = await req.json();
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new UserModel({ 
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: hashedPassword,
      role : data.role,
      address : data.address,
      phone_number  : data.phone
    });
    await newUser.save();
    return NextResponse.json({ success: true, message: "USER REGISTERED SUCCESSFULLY" });
  } catch (error) {
    console.log("Authorization Error:", error);
    return NextResponse.json({ success: true, message: "Authorization Error" });;
  }
}