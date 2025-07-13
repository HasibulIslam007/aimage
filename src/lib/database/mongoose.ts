import mongoose, { Mongoose } from "mongoose";

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) throw new Error("Missing MONGODB_URL");

  console.log("Connecting to MongoDB with:", mongoUrl);

  cached.promise =
    cached.promise ||
    mongoose.connect(mongoUrl, {
      dbName: "aimage",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  const dbName = cached.conn.connection.db?.databaseName ?? "unknown";
  console.log("✅ Connected to DB:", dbName);

  return cached.conn;
};
