// Import the serve function from Deno
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

// This function runs when the webhook is triggered
serve(async (req) => {
  try {
    // Parse JSON body
    const body = await req.json();

    // Check that payload contains the user object
    if (!body?.user) {
      console.error("Missing user in payload");
      return new Response("Missing user", { status: 400 });
    }

    const { id, email } = body.user;

    console.log("✅ New user signed up:", email, "(ID:", id + ")");

    // Optional: Insert into your DB (if needed)
    // You can also call Supabase client here if needed

    return new Response("User processed successfully", { status: 200 });
  } catch (err) {
    console.error("❌ Error processing webhook:", err);
    return new Response("Error", { status: 500 });
  }
});
