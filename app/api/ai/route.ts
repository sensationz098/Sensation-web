import { knowledgebase } from "@/data/knowledgebase";
import OpenAI from "openai";

export const POST = async (req: Request) => {
  const body = await req.json();
  const userPrompt = body.userPrompt;
  console.log("PROMPT IS: ", userPrompt);
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: OPENROUTER_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "stepfun/step-3.5-flash:free",
    messages: [
      {
        role: "user",
        content: `Knowledge Base: ${JSON.stringify(knowledgebase)} \n\n User prompt: ${userPrompt} \n\n `,
      },
    ],
    temperature: 0,
  });

  const message = completion.choices[0].message.content;
  return Response.json({ success: true, message: message });
};
