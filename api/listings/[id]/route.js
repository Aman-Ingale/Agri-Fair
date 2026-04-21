/**
 * GET /api/listings/:id — single listing details
 * PUT /api/listings/:id — update (only farmer owner)
 */
import dbConnect from '@/lib/dbConfig'
import ListingModel from '@/models/listing_model'
import { Types } from 'mongoose';
export async function GET(req, { params }) {
    const { id } = await params
    if (!Types.ObjectId.isValid(id)) {
        return Response.json({success:false,message: "Not Found", data: null }, { status: 400 });
    }
    try {
        await dbConnect()
        const plainData = await ListingModel.findById(id)
        if (!plainData) {
            return Response.json({ success:false,message: "Not Found", data: null }, { status: 400 })

        }
        const data = JSON.parse(JSON.stringify(plainData))
        return Response.json({ success:true,message: "Found", data: data }, { status: 200 })
    } catch (error) {
        console.log("Something went wrong", error)
        return Response.json({ success:false,message: "Internal Server Error", data: null }, { status: 500 })

    }

}
export async function PUT(req, { params }) {
    const { id } = await params
    const updateData = await req.json()
    if (!Types.ObjectId.isValid(id)) {
        return Response.json({success:false,message: "Not Found"}, { status: 400 });
    }
    try {
        await dbConnect()
        const plainData = await ListingModel.updateOne(
        { _id: id },
        { $set: updateData}
    );
    console.log("Updated")
        return Response.json({ success:true,message: "Updated" }, { status: 200 })
    } catch (error) {
        console.log("Something went wrong", error)
        return Response.json({ success:false,message: error }, { status: 500 })

    }
}