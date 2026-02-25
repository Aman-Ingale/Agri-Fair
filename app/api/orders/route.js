/**
 * POST /api/orders — create order from accepted bid (order document created)
 * POST /api/orders/:id/pay — initiate payment (gateway integration) → creates escrow
 * POST /api/orders/:id/delivery-confirm — buyer uploads delivery proof, farmer confirms (or vice versa)
 * POST /api/orders/:id/release — admin or automatic release after confirmations
 */

import order_model from "@/models/order_model";
import dbConnect from "@/lib/dbConfig";
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
      plainData = await order_model.find({
        farmer_id:id
      }).populate('listings_id')
    }
    else {
      console.log("In Buyer")
      plainData = await order_model.find({
        buyer_id:id
      }).populate('listings_id')

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
    console.log(data)
    try {
        await dbConnect()
        const bid = new order_model({
            listings_id: new mongoose.Types.ObjectId(data.listings_id),
            buyer_id: new mongoose.Types.ObjectId(data.buyer_id),
            farmer_id: new mongoose.Types.ObjectId(data.farmer_id),
            bid_id: data.bid_id,
            price: data.price,
            total: data.total,
            quantity: data.quantity,
            contact_number: data.contact_number,
            delivery_address: data.delivery_address
        })
        const savedBid = await bid.save();
        return Response.json({ success: true, message: "Success" }, { status: 200 })
    } catch (error) {
        console.log("Something went wrong", error)
        return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 })
    }
}
