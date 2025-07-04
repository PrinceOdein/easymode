// src/lib/tamboClient.ts
import { TamboClient } from "tambo-ai";

const apiKey = import.meta.env.VITE_TAMBO_API_KEY || ""; // fallback if undefined

export const tambo = new TamboClient({
  apiKey,
  // You can also add default role/device config here if needed
});
