import { connectToDatabase } from "./database/mongoose";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { createUser } from "./actions/user.actions";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

async function testUserCreation() {
  try {
    // Test user data
    const testUser = {
      clerkId: "test_clerk_id_" + Date.now(),
      email: "test@example.com",
      username: "testuser_" + Date.now(),
      firstName: "Test",
      lastName: "User",
      photo: "https://example.com/photo.jpg",
    };

    // Try to create the user
    console.log("Creating test user...");
    const newUser = await createUser(testUser);
    console.log("Created user:", newUser);

    // Close the connection
    await mongoose.connection.close();
    console.log("Connection closed successfully");
  } catch (error) {
    console.error("❌ Test failed:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
  } finally {
    process.exit();
  }
}

testUserCreation();
