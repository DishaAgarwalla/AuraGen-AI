import { CognitiveLoadResult } from "../utils/cognitiveLoad";
import { generateAdaptiveUI } from "../services/uiGenerationService";

export async function adaptiveUIAgent(
  formDescription: string,
  analysis: CognitiveLoadResult
) {
  console.log("====================================");
  console.log("🧠 Adaptive UI Agent");
  console.log("====================================");

  if (analysis.status !== "HIGH") {
    console.log("User cognitive load is not HIGH.");
    console.log("No adaptive UI required.");

    return {
      adapted: false,
      generatedUI: null,
    };
  }

  console.log("High cognitive load detected.");
  console.log("Generating adaptive UI...\n");

  const adaptiveUI = await generateAdaptiveUI(
    formDescription,
    analysis
  );

  return {
    adapted: true,
    ...adaptiveUI,
  };
}