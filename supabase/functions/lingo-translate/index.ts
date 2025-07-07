import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
// supabase/functions/lingo-translate/index.ts
// …same CORS + OPTIONS code …

const { text, targetLocale } = await req.json();

const lingoRes = await fetch("https://engine.lingo.dev/i18n", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Deno.env.get("LINGO_API_KEY")}`,
  },
  body: JSON.stringify({
    data:   { text },
    locale: { source: "en", target: targetLocale },
    params: { workflowId: "translation" },   // ✅ REQUIRED
  }),
});

const result = await lingoRes.json();


    return new Response(JSON.stringify(result), {
      status: lingoRes.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("Translation error:", err);
    return new Response(JSON.stringify({ error: "Failed to translate" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
