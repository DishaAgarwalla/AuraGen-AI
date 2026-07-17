import { generateSimplifiedUI } from "../agents/uiSimplificationAgent";
import { generateReactComponent } from "../agents/codeGenerationAgent";

import { validateGeneratedCode } from "../compiler/astValidator";

import { buildUIPrompt } from "../utils/promptBuilder";
import { CognitiveLoadResult } from "../utils/cognitiveLoad";

export async function generateAdaptiveUI(
  formDescription: string,
  analysis: CognitiveLoadResult
) {
  console.log("====================================");
  console.log("🚀 UI Generation Service");
  console.log("====================================");

  //------------------------------------------
  // Build Prompt
  //------------------------------------------

  const prompt = buildUIPrompt(
    formDescription,
    analysis
  );

  //------------------------------------------
  // Step 1
  //------------------------------------------

  const simplifiedUI =
    await generateSimplifiedUI(prompt);

  //------------------------------------------
  // Step 2
  //------------------------------------------

  const generatedCode =
    await generateReactComponent(
      simplifiedUI
    );

  //------------------------------------------
  // Step 3
  //------------------------------------------

  const isValid =
    validateGeneratedCode(generatedCode);

  if (!isValid) {
    throw new Error(
      "Generated React component failed validation."
    );
  }

  console.log("✅ React Component Validated");

  return {
    simplifiedUI,
    generatedCode,
    cognitiveScore: analysis.score,
    status: analysis.status,
  };
}