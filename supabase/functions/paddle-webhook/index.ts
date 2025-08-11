// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
/*
console.log("Hello from Functions!")

Deno.serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: `Hello ${name}!`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})
*/
/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/paddle-webhook' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/

// supabase/functions/paddle-webhook/index.ts
//import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const SUPABASE_URL = Deno.env.get("REACT_APP_SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SERVICE_ROLE_KEY");

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const body = await req.json();
  const eventType = body.event_type;

  // Simple logging to check structure (remove in prod)
  console.log("Received Paddle event:", eventType);

  // Example: Handle subscription activation
  if (
    eventType === "subscription_created" || eventType === "subscription_updated"
  ) {
    const userEmail = body.data.user_email;
    const subscriptionId = body.data.subscription_id;
    const planName = body.data.plan_name;
    const startedAt = body.data.created_at;
    const status = body.data.status;

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      throw new Error("Missing Supabase environment variables");
    }

    // Lookup user_id by userEmail in Supabase auth.users table
    const userResponse = await fetch(
      `${SUPABASE_URL}/auth/v1/users?email=${userEmail}`,
      {
        headers: {
          "apikey": SERVICE_ROLE_KEY!,
          "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
        },
      },
    );
    const users = await userResponse.json();
    const userId = users[0]?.id;

    if (!userId) {
      return new Response("User not found", { status: 404 });
    }

    // Optionally store this in your Supabase DB
    const res = await fetch(`${SUPABASE_URL}/rest/v1/subscriptions`, {
      method: "POST",
      headers: {
        "apikey": SERVICE_ROLE_KEY!,
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates", // upsert
      },
      body: JSON.stringify({
        user_id: userId,
        subscription_id: subscriptionId,
        plan_name: planName,
        status: status,
        started_at: startedAt,
      }),
    });

    if (!res.ok) {
      return new Response("Failed to save subscription", { status: 500 });
    }

    return new Response("Subscription saved", { status: 200 });
  }

  return new Response("Unhandled event", { status: 200 });
});
