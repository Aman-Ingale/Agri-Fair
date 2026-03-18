/**
 * POST /api/listings — create a listing (farmer)Request body: { title, cropId, variety, grade, quantityQtl, minOrderQtl, pricePerQtl, harvestDate, location: {lat,lon}, images[] }
 * GET /api/listings — search & filters Query params: ?crop=onion&minQtl=20&maxDistanceKm=100&sort=price_asc&page=1&pageSize=20
        "title":"ullamcorper purus sit",
        "crop":"modular",
        "variety":"Saxifragaceae",
        "grade":4,
        "total_quantity":478,
        "available_quantity":321,
        "price":5175,
        "location":"USA",
        "total_bids":15,
        "harvest_date":"27/7/2025",
        "created_at":"9/1/2025",
        "updated_at":"18/2/2025",
        "farmer_id":83
 */
import dbConnect from "@/lib/dbConfig"
import ListingModel from "@/models/listing_model"
import mongoose from "mongoose";
import { cookies } from "next/headers";

export async function POST(req) {
  await dbConnect()
  const cookie = await cookies();
  try {
    const data = await req.json();
    const id = cookie.get("id").value;

    // Validate required fields
    if (
      // !data.farmer_id|| 
      !data.title || !data.crop || !data.variety || !data.grade || !data.total_quantity || !data.available_quantity || !data.price || !data.location) {
      return Response.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const listing = ListingModel({
      // farmer_id: new mongoose.Types.ObjectId(data.farmer_id),
      farmer_id: new mongoose.Types.ObjectId(id),
      title: data.title,
      crop: data.crop,
      variety: data.variety,
      grade: Number(data.grade),
      total_quantity: Number(data.total_quantity),
      available_quantity: Number(data.available_quantity),
      price: Number(data.price),
      location: data.location,
      harvest_date: data.harvest_date ? new Date(data.harvest_date) : new Date(),
    })
    await listing.save();
    return Response.json({ success: true, message: "Listing created successfully" }, { status: 200 })
  } catch (error) {
    console.log("Something went wrong", error)
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}
export async function GET(req) {
  try {
    await dbConnect();
    const cookie = await cookies();
    const role = cookie.get("role").value;
    const id = cookie.get("id").value;
    if (role === 'farmer') {
      const plainData = await ListingModel.find({
        'farmer_id': new mongoose.Types.ObjectId(id)
      });
      const data = plainData.map((lis) => JSON.parse(JSON.stringify(lis)));

      return Response.json(
        { success: true, message: "Success", data },
        { status: 200 }
      );
    }
    const { searchParams } = new URL(req.url);
    let filters = {};

    // numeric fields that should support _min and _max
    const numericFields = ["grade", "price", "total_bids"];

    // loop through all query params
    searchParams.forEach((value, key) => {
      if (!value) return;

      // handle numeric min/max filters
      numericFields.forEach((field) => {
        if (key === `${field}_min`) {
          if (!filters[field]) filters[field] = {};
          filters[field]["$gte"] = Number(value);
        }
        if (key === `${field}_max`) {
          if (!filters[field]) filters[field] = {};
          filters[field]["$lte"] = Number(value);
        }
      });

      // handle regular string filters (exact match)
      if (
        !key.endsWith("_min") &&
        !key.endsWith("_max") &&
        !numericFields.includes(key) &&
        key !== "search"
      ) {
        filters[key] = value;
      }
    });

    // handle search (partial match in multiple fields)
    const searchValue = searchParams.get("search");
    if (searchValue) {
      const searchRegex = new RegExp(searchValue, "i"); // case-insensitive
      filters.$or = [
        { crop: searchRegex },
        { variety: searchRegex },
        { location: searchRegex },
      ];
    }

    const plainData = await ListingModel.find(filters);
    const data = plainData.map((lis) => JSON.parse(JSON.stringify(lis)));

    return Response.json(
      { success: true, message: "Success", data },
      { status: 200 }
    );
  } catch (error) {
    console.log("Something went wrong", error);
    return Response.json(
      { success: false, message: "Internal Server Error", data: null },
      { status: 500 }
    );
  }
}

// export async function GET(req) {
//     return Response.json([{

//     }])
// }
