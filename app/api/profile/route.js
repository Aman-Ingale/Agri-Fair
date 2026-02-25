import dbConnect from "@/lib/dbConfig";
import UserModel from "@/models/user_model";
import mongoose, { Types } from "mongoose";
import { cookies } from "next/headers";
export async function GET(req) {
    const cookie = await cookies();
    const role = await cookie.get('role').value;
    const id = await cookie.get('id').value;
    try {
        await dbConnect()
        const plainData = await UserModel.findById(id)
        console.log(plainData)
        return Response.json({ success: true, message: "Success", data: plainData }, { status: 200 })
    } catch (error) {
        console.log("Something went wrong", error)
        return Response.json({ success: false, message: "Internal Server Error", data: null }, { status: 500 })

    }
}