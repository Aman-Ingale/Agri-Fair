import mongoose from "mongoose";
import UserModel from "./user_model";
import crops from "@/public/crops.json"
const ListingSchema = new mongoose.Schema({
  farmer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "listings",
    required: true,
  },
  title: String,
  crop: {
    type: String,
    enum: Object.keys(crops),
  },
  variety: String,
  grade: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  total_quantity: Number,
  available_quantity: Number,
  price: Number,
  location: String,
  total_bids: {
    type: Number,
    default: 0,
  },
  harvest_date: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

ListingSchema.post("save", async function (doc) {
      await UserModel.findByIdAndUpdate(doc.farmer_id, {
      $addToSet: { listings: doc._id }, // $addToSet avoids duplicates
    });
});
const ListingModel =
  mongoose.models.listings || mongoose.model("listings", ListingSchema);

export default ListingModel;
