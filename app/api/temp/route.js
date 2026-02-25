import dbConnect from "@/lib/dbConfig";
import UserModel from "@/models/user_model";

export async function POST(req) {
    dbConnect();
    try {
        const user = UserModel({
            firstname: "Aman",
            lastname: "Ingale",
            email: "aman.@example.com",
            password: "aman", 
            phone_number: "9876543210",
            role: "buyer", 
            address: "Pune, Maharashtra, India",
        }
        )
        await user.save();
        return Response.json({ success: true, message: "Success" }, { status: 200 })
    } catch (error) {
        console.log("Something went wrong", error)
        return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 })
    }
}