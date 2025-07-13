/* eslint-disable camelcase */
import { clerkClient } from "@clerk/nextjs/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
import { connectToDatabase } from "@/lib/database/mongoose";

// Create a new temporary file with the new webhook handler
export async function POST(req: Request) {
  try {
    console.log("🔔 Webhook endpoint hit");

    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      console.error("❌ Missing WEBHOOK_SECRET");
      throw new Error("Missing WEBHOOK_SECRET");
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("❌ Missing Svix headers");
      return new Response("Missing Svix headers", { status: 400 });
    }

    // Get and parse request body
    const payload = await req.json();
    console.log(
      "📦 Received webhook payload:",
      JSON.stringify(payload, null, 2)
    );

    const body = JSON.stringify(payload);
    const wh = new Webhook(WEBHOOK_SECRET);

    try {
      const evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;

      const { type, data } = evt;
      console.log("📝 Event type:", type);

      // Handle user.created event
      if (type === "user.created") {
        console.log("👤 Creating new user...");

        try {
          await connectToDatabase();
          console.log("✅ Database connected");

          const userData = {
            clerkId: data.id,
            email: data.email_addresses?.[0]?.email_address,
            username: data.username || `user_${data.id.slice(-6)}`,
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            photo:
              data.image_url ||
              data.profile_image_url ||
              "https://example.com/default-avatar.png",
          };

          console.log(
            "📊 Creating user with data:",
            JSON.stringify(userData, null, 2)
          );

          const newUser = await createUser(userData);
          console.log(
            "✅ User created in MongoDB:",
            JSON.stringify(newUser, null, 2)
          );

          if (newUser) {
            await clerkClient.users.updateUserMetadata(data.id, {
              publicMetadata: {
                userId: newUser._id,
              },
            });
            console.log("✅ Updated Clerk metadata");
          }

          return NextResponse.json({ success: true, user: newUser });
        } catch (error) {
          console.error("❌ Error creating user:", error);
          throw error;
        }
      }

      return NextResponse.json({ success: true, message: "Webhook processed" });
    } catch (err) {
      console.error("❌ Error verifying webhook:", err);
      return new Response("Error verifying webhook", { status: 400 });
    }
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: error }),
      { status: 500 }
    );
  }
}
