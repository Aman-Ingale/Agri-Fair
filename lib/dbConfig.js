import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI 
// || "mongodb+srv://ingaleaman905:Amaningale2516@handyconnect.lomguda.mongodb.net/";

let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
