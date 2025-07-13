import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function testConnection() {
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log("URL:", process.env.MONGODB_URL);

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB connection successful!");

    // Get database name
    const db = mongoose.connection.db;
    if (db) {
      console.log(`Connected to database: ${db.databaseName}`);
    }

    // Create a test collection
    const testCollection = db.collection("test");

    // Try to insert a document
    const result = await testCollection.insertOne({
      test: true,
      timestamp: new Date(),
    });

    console.log("✅ Test document inserted:", result);
  } catch (error) {
    console.error("❌ MongoDB connection/operation failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed");
    process.exit();
  }
}

testConnection();
