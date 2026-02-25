import mongoose from "mongoose";
import ListingModel from "./listing_model.js";
import UserModel from "./user_model.js";
const BidsSchema = new mongoose.Schema({
  listings_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "listings",
    required: true,
  },
  buyer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    },
  farmer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    },
  total: Number,
  bid_price: Number,
  quantity: Number,
  title: String,
  variety: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

BidsSchema.post("save", async function (doc) {
    console.log("Post-save triggered for:", doc._id, "Listing:", doc.listings_id);
  await ListingModel.findByIdAndUpdate(doc.listings_id, { $inc: { total_bids: 1 } });
      await UserModel.findByIdAndUpdate(doc.buyer_id, {
      $addToSet: { bids: doc._id }, // $addToSet avoids duplicates
    });
      await UserModel.findByIdAndUpdate(doc.farmer_id, {
      $addToSet: { bids: doc._id }, // $addToSet avoids duplicates
    });
});

BidsSchema.post("findOneAndDelete", async function (doc) {
  if (doc?.listings_id) {
    await ListingModel.findByIdAndUpdate(doc.listings_id, { $inc: { total_bids: -1 } });
  }
});

const BidsModel =
  mongoose.models.bids || mongoose.model("bids", BidsSchema);

export default BidsModel;
