import dbConnect from "@/lib/dbConfig";
import UserModel from "@/models/user_model";

// ✅ IMPORTANT: Import all models used in populate
import "@/models/order_model";
import "@/models/listing_model";
import "@/models/bids_model";

import { Types } from "mongoose";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
    try {
        // =========================
        // 🍪 Get User ID (params OR cookie)
        // =========================
        const cookieStore = await cookies();

        const id = await
            params?.id ||
            cookieStore.get("id")?.value;

        // ❌ No ID found
        if (!id) {
            return Response.json(
                { success: false, message: "User ID missing" },
                { status: 400 }
            );
        }

        // ✅ Validate ObjectId
        if (!Types.ObjectId.isValid(id)) {
            return Response.json(
                { success: false, message: "Invalid User ID" },
                { status: 400 }
            );
        }

        // =========================
        // 🔌 Connect DB
        // =========================
        await dbConnect();

        // =========================
        // 👤 Fetch User + Populate
        // =========================
        const user = await UserModel.findById(id)
            .populate("orders", "total order_status")
            .populate("listings", "price crop")
            .populate("bids", "price")
            .lean();

        // ❌ User not found
        if (!user) {
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // =========================
        // 📊 Calculations
        // =========================

        const total_listings = user.listings?.length || 0;
        const total_bids = user.bids?.length || 0;
        const total_orders = user.orders?.length || 0;

        // 💰 Total Revenue (only completed orders)
        const total_revenue =
            user.orders?.reduce((sum, order) => {
                return order.order_status === "completed"
                    ? sum + (order.total || 0)
                    : sum;
            }, 0) || 0;

        // 📦 Avg Listing Price
        const totalListingPrice =
            user.listings?.reduce(
                (sum, listing) => sum + (listing.price || 0),
                0
            ) || 0;

        const avg_listing =
            total_listings > 0
                ? totalListingPrice / total_listings
                : 0;

        // 📊 Avg Bid Price
        const totalBidPrice =
            user.bids?.reduce(
                (sum, bid) => sum + (bid.price || 0),
                0
            ) || 0;

        const avg_bid =
            total_bids > 0
                ? totalBidPrice / total_bids
                : 0;

        // =========================
        // 🌾 Crop Distribution
        // =========================

        const cropsMap = {
            wheat: 0,
            rice: 0,
            cotton: 0,
            jute: 0,
        };

        user.listings?.forEach((listing) => {
            if (listing.crop && cropsMap.hasOwnProperty(listing.crop)) {
                cropsMap[listing.crop]++;
            }
        });

        // =========================
        // 📦 Final Response
        // =========================

        const data = {
            firstname: user.firstname,
            address: user.address,
            total_listings,
            total_bids,
            total_orders,
            total_revenue,
            avg_listings: avg_listing,
            avg_bids: avg_bid,
            crops: cropsMap,
        };

        return Response.json(
            { success: true, message: "Success", data },
            { status: 200 }
        );

    } catch (error) {
        console.error("API ERROR:", error);

        return Response.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}