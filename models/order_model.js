import mongoose from "mongoose";
import UserModel from "./user_model";

const orderSchema = new mongoose.Schema({
  listings_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "listings",
    required: true,
  },
  buyer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  farmer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  bid_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bids",
  },

  quantity: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },

  payment_status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },

  order_status: {
    type: String,
    enum: ["placed", "confirmed", "cancelled", "completed"],
    default: "placed",
  },

  delivery_address: {
    type: String,
    required: true,
  },

  contact_number: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },
});
orderSchema.post("save", async function (doc) {
  await UserModel.findByIdAndUpdate(doc.buyer_id, {
    $addToSet: { orders: doc._id }, // $addToSet avoids duplicates
  });
  await UserModel.findByIdAndUpdate(doc.farmer_id, {
    $addToSet: { orders: doc._id }, // $addToSet avoids duplicates
  });
});
export default mongoose.models.orders || mongoose.model("orders", orderSchema);
