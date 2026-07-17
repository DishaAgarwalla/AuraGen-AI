import { HumanMessage } from "@langchain/core/messages";

import { llm } from "../services/llm";
import { codeGenerationPrompt } from "../prompts/codeGeneration";

export async function generateReactComponent(
  simplifiedUI: string
): Promise<string> {
  try {
    console.log("====================================");
    console.log("⚡ Code Generation Agent");
    console.log("====================================");

    const response = await llm.invoke([
      new HumanMessage(`
${codeGenerationPrompt}

${simplifiedUI}
      `),
    ]);

    const content =
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);

    console.log("Generated React Component:");
    console.log(content);

    return content;
  } catch (error) {
    console.error(
      "❌ Code Generation Agent Error:",
      error
    );

    throw error;
  }
}