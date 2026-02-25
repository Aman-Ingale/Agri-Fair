import dbConnect from "@/lib/dbConfig";
import ListingModel from "@/models/listing_model";
import BidsModel from "@/models/bids_model";
import OrderModel from "@/models/order_model";
import UserModel from "@/models/user_model";
import mongoose, { Types } from "mongoose";

export async function GET(req, { params }) {
    const {id}  = await params;
    if (!Types.ObjectId.isValid(id)) {
        return Response.json({ success: false, message: "Not Found" }, { status: 400 });
    }
    try {
        await dbConnect()
        // const user = await UserModel.findById(id).populate(["bids","orders","listings"])
        const user = await UserModel.findById(id).populate("orders").populate("listings").populate("bids")
        const total_listings = user.listings.length
        const total_bids = user.bids.length
        const total_orders = user.orders.length
        let sum = 0;
        user.orders.forEach(order => {
            sum += order.total;
        });
        const total_revenue = sum;
        sum = 0;
        user.listings.forEach(listing => {
            sum += listing.price;
        });
        const avg_listing = sum / total_listings
        sum = 0
        user.bids.forEach(bid => {
            sum += bid.price;
        });
        const avg_bid = sum / total_bids || 0
        sum = 0
        const cropsMap = new Map();
        cropsMap.set('wheat',0)
        cropsMap.set('rice',0)
        cropsMap.set('cotton',0)
        cropsMap.set('jute',0)
        user.listings.forEach(listing=>{
            cropsMap.set(listing.crop,cropsMap.get(listing.crop)+1)
        });
        const crops = Object.fromEntries(cropsMap) 
        const data = {
            "firstname" : user.firstname,
            "address" : user.address,
            "total_listings" : total_listings,
            "total_bids" : total_bids,
            "total_orders" : total_orders,
            "total_revenue" : total_revenue,
            "avg_listings" : avg_listing,
            "avg_bids" : avg_bid,
            "crops" : crops
        }
        // Total listing -> sum of the array of listings
        // total bids -> -//- of bids
        // total orders -> -//- of orders
        // total revenue -> sum of all entries of orders.price (which are completed) 
        // avg listing price -> sum of all listings.price / total listings
        // avg bids price -> sum of all bids.bids_price / total listings
        // crop distribution -> [crop] = listings.[crop].count
        // order status -> -//-

        //ADDING GRAPHS AND CHARTS ON DASHBOARD
        return Response.json({ success: true, message: "Success", data: data }, { status: 200 })
    } catch (error) {
        console.log("Something went wrong", error)
        return Response.json({ success: false, message: "Internal Server Error", data: null }, { status: 500 })

    }
}

