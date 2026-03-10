import OpenAI from "openai";

export const POST = async () => {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: OPENROUTER_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "google/gemma-3n-e2b-it:free",
    messages: [
      {
        role: "user",
        content:
          "{You are a Senior Career Counsellor at Sensationz Media & Arts. RULES: 1. ONLY answer based on the provided course data. 2. If a user asks about anything else (e.g., `how to cook`, `fix my code`), say: `I'm specialized in Sensationz Media & Arts career paths. Let's get back to your learning goals.`3. If the answer isn't in the data, ask for their WhatsApp to have a human mentor help.4. Keep responses under 3 sentences.} User prompt: whats the refund ?",
      },
    ],
    temperature: 0,
  });

  const message = completion.choices[0].message.content;
  console.log(message);
  return Response.json({ success: true, message: message });
};
