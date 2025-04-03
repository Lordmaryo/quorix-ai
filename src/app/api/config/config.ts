import OpenAI from "openai";

export const openAi = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL,
    "X-Title": process.env.NEXT_PUBLIC_SITE_NAME,
  },
});

if (!openAi.apiKey) {
  throw new Error("OpenAi api key not configured");
}
