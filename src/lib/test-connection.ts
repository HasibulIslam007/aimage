import { connectToDatabase } from "./database/mongoose";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// Debug: Check if environment variables are loaded
console.log("MONGODB_URL:", process.env.MONGODB_URL);

async function testConnection() {
  try {
    const conn = await connectToDatabase();
    if (!conn || !conn.connection) {
      throw new Error("Connection failed");
    }
    console.log("✅ MongoDB connection successful!");

    // Get database name
    const db = mongoose.connection.db;
    if (db) {
      console.log(`Connected to database: ${db.databaseName}`);
    }

    // Close the connection
    await mongoose.connection.close();
    console.log("Connection closed successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  } finally {
    process.exit();
  }
}

testConnection();
