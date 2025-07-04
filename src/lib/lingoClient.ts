import { LingoDotDevEngine } from "lingo.dev/sdk";

const apiKey = import.meta.env.VITE_LINGO_API_KEY!;

export const lingo = new LingoDotDevEngine({ apiKey });
