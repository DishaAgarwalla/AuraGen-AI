import { HumanMessage } from "@langchain/core/messages";

import { llm } from "../services/llm";
import { explainFieldPrompt } from "../prompts/explainField";

export async function explainField(
  fieldName: string
): Promise<string> {
  try {
    console.log("====================================");
    console.log("💬 Explain Field Agent");
    console.log("====================================");

    const response = await llm.invoke([
      new HumanMessage(`
${explainFieldPrompt}

Field:

${fieldName}
      `),
    ]);

    const content =
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);

    console.log("Explanation:");
    console.log(content);

    return content;
  } catch (error) {
    console.error(
      "❌ Explain Field Agent Error:",
      error
    );

    throw error;
  }
}