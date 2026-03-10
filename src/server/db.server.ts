// app/server/db.ts
import mongoose from "mongoose";

const LOCAL_DATABASE_URI = process.env.LOCAL_DATABASE_URI as string;

if (!LOCAL_DATABASE_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

// * Prevents multiple connections during hot reload in dev
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

const cached = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB() {
  // * Already connected — reuse it
  if (cached.conn) {
    return cached.conn;
  }

  // * Connection in progress — wait for it
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(LOCAL_DATABASE_URI, {
        bufferCommands: false,
      })
      .then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
