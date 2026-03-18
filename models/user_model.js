import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password:String,
  phone_number : {type : String, required : false,default : "-"},
  role: {
    type: String,
    enum: ['farmer', 'buyer','admin'],
  },
  address : {type : String, required : false,default : ""},
  bids : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bids", // Reference to Post model
    },
  ],
  listings : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "listings", // Reference to Post model
    }  
  ],
  orders : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders", // Reference to Post model
    },
  ],
  created_at:{
    type:Date,default:Date.now()
  },
  updated_at:{
    type:Date,default:Date.now()
  }
});
const UserModel = mongoose.models?.users || mongoose.model("users", UserSchema);
export default UserModel


