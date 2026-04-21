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
export async function PUT(req, { params }) {
    const cookie = await cookies();
    const role = await cookie.get('role').value;
    const id = await cookie.get('id').value;
    const { updateData } = await req.json()
    console.log(updateData)
    if (!Types.ObjectId.isValid(id)) {
        return Response.json({ success: false, message: "Not Found" }, { status: 400 });
    }
    try {
        await dbConnect()
        const plainData = await UserModel.updateOne(
            { _id: id },
            { $set: updateData }
        );
        console.log(plainData)
        return Response.json({ success: true, message: "Updated" }, { status: 200 })
    } catch (error) {
        console.log("Something went wrong", error)
        return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 })

    }
}