import { cookies } from "next/headers";

export async function POST(req) {
    const data = await req.json();
    const cookie = await cookies();
    console.log(data.id)
    try {
        const response = Response.json({ success: true, message: "Success" }, { status: 200 })
        cookie.set('role', data.role, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
        cookie.set('id', data.id, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
        return response
    } catch (error) {
        console.log("Something went wrong", error)
        return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 })
    }
}