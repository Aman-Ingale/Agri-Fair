import dbConnect from "@/lib/dbConfig";
import BidsModel from "@/models/bids_model";
import mongoose, { Types } from "mongoose";
import { cookies } from "next/headers";
export async function GET(req, { params }) {
  const cookie = await cookies();
  const role = await cookie.get('role').value;
  const id = await cookie.get('id').value;
  if (!Types.ObjectId.isValid(id)) {
    return Response.json({ success: false, message: "Not Found" }, { status: 400 });
  }
  try {
    await dbConnect()
    let plainData = null
    if (role == 'farmer') {
      console.log("In farmer")
      plainData = await BidsModel.find({
        farmer_id:id
      })
    }
    else {
      console.log("In Buyer")
      plainData = await BidsModel.find({
        buyer_id:id
      })

    }
    const data = plainData.map(bid => JSON.parse(JSON.stringify(bid)));
    console.log(data)
    return Response.json({ success: true, message: "Success", data: data }, { status: 200 })
  } catch (error) {
    console.log("Something went wrong", error)
    return Response.json({ success: false, message: "Internal Server Error", data: null }, { status: 500 })

  }
}
export async function PUT(req, { params }) {
  const { id } = await params
  const {updateData} = await req.json()
  console.log(updateData)
  if (!Types.ObjectId.isValid(id)) {
    return Response.json({ success: false, message: "Not Found" }, { status: 400 });
  }
  try {
    await dbConnect()
    const plainData = await BidsModel.updateOne(
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
export async function DELETE(req, { params }) {
  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    return Response.json({ success: false, message: "Invalid ID" }, { status: 400 });
  }

  try {
    await dbConnect();
    const result = await BidsModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return Response.json({ success: false, message: "Not Found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Deleted Successfully" }, { status: 200 });
  } catch (error) {
    console.log("Something went wrong", error);
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}