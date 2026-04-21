/**
* POST /api/listings/:id/bids — place bid {buyerId, bidPricePerQtl, quantityQtl, notes
* GET /api/listings/:id/bids — list bids (owner sees)
 */
import dbConnect from "@/lib/dbConfig";
import BidsModel from "@/models/bids_model";
import mongoose, { Types } from "mongoose";
import { cookies } from "next/headers";
export async function GET(req, { params }) {
  const cookie = await cookies();
  const role = await cookie.get('role').value;
  const id = await cookie.get('id').value;
  //admin logic pending
  if (!Types.ObjectId.isValid(id)) {
    return Response.json({ success: false, message: "Not Found" }, { status: 400 });
  }
  try {
    await dbConnect()
    let plainData = null
    if (role == 'farmer') {
      console.log("In farmer")
      plainData = await BidsModel.find({
        farmer_id: id
      })
    }
    else {
      console.log("In Buyer")
      plainData = await BidsModel.find({
        buyer_id: id
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
export async function POST(req) {
  const data = await req.json();
  const cookie = await cookies();
  const role = await cookie.get('role').value;
  const buyerid = await cookie.get('id').value;
  try {
    await dbConnect()
    const bid = new BidsModel({
      listings_id: new mongoose.Types.ObjectId(data.listings_id),
      buyer_id: new mongoose.Types.ObjectId(buyerid),
      farmer_id: new mongoose.Types.ObjectId(data.farmer_id),
      bid_price: data.bid_price,
      total: data.total,
      quantity: data.quantity,
      status: 'pending',
      title: data.title,
      variety: data.variety
    })
    console.log(bid)
    const savedBid = await bid.save();
    return Response.json({ success: true, message: "Success" }, { status: 200 })
  } catch (error) {
    console.log("Something went wrong", error)
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}