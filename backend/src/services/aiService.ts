import OpenAI from "openai";

console.log("API Key Loaded:", !!process.env.OPENROUTER_API_KEY);

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    console.log("Sending request to OpenRouter...");

    const completion = await client.chat.completions.create({
      model: "meta-llama/llama-3.2-3b-instruct:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log("Complete Response:");
    console.log(JSON.stringify(completion, null, 2));

    return completion.choices[0].message.content ?? "No response";
  } catch (err: any) {
    console.log("STATUS:", err.status);
    console.log("MESSAGE:", err.message);
    console.log("ERROR:", err.error);
    console.log("FULL ERROR:");
    console.dir(err, { depth: null });

    throw err;
  }
}