import order_model from "@/models/order_model";
import dbConnect from "@/lib/dbConfig";

// ✅ IMPORTANT: import models used in populate
import "@/models/listing_model";

import mongoose, { Types } from "mongoose";
import { cookies } from "next/headers";

// =========================
// 📦 GET ORDERS
// =========================
export async function GET(req) {
  try {
    const cookieStore = await cookies();

    const role = cookieStore.get("role")?.value;
    const id = cookieStore.get("id")?.value;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Invalid User" },
        { status: 400 }
      );
    }

    await dbConnect();

    let orders;

    if (role === "farmer") {
      orders = await order_model
        .find({ farmer_id: id })
        .populate("listings_id") // ✅ now works
        .lean();
    } else {
      orders = await order_model
        .find({ buyer_id: id })
        .populate("listings_id")
        .lean();
    }

    return Response.json(
      { success: true, data: orders },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR:", error);

    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// =========================
// ➕ CREATE ORDER
// =========================
export async function POST(req) {
  try {
    const data = await req.json();

    await dbConnect();

    const order = new order_model({
      listings_id: new mongoose.Types.ObjectId(data.listings_id),
      buyer_id: new mongoose.Types.ObjectId(data.buyer_id),
      farmer_id: new mongoose.Types.ObjectId(data.farmer_id),
      bid_id: data.bid_id,
      price: data.price,
      total: data.total,
      quantity: data.quantity,
      contact_number: data.contact_number,
      delivery_address: data.delivery_address,
    });

    await order.save();

    return Response.json(
      { success: true, message: "Order Created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("ERROR:", error);

    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}