import { HumanMessage } from "@langchain/core/messages";

import { llm } from "../services/llm";
import { simplifyFormPrompt } from "../prompts/simplifyForm";

export async function generateSimplifiedUI(
  userPrompt: string
): Promise<string> {
  try {
    console.log("====================================");
    console.log("🤖 UI Simplification Agent");
    console.log("====================================");

    const response = await llm.invoke([
      new HumanMessage(`
${simplifyFormPrompt}

${userPrompt}
      `),
    ]);

    const content =
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);

    console.log("Simplified UI:");
    console.log(content);

    return content;
  } catch (error) {
    console.error(
      "❌ UI Simplification Agent Error:",
      error
    );

    throw error;
  }
}