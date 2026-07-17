import { TelemetryData } from "../types/telemetry";
import { calculateCognitiveLoad } from "../utils/cognitiveLoad";
import { generateAdaptiveUI } from "./uiGenerationService";
import { getFormContext } from "./formContextService";
import { emitAdaptiveUI } from "../websocket/socket";

export async function processTelemetry(
  telemetry: TelemetryData
) {
  /*
  =====================================
  Cognitive Load Analysis
  =====================================
  */

  const analysis = calculateCognitiveLoad(telemetry);

  console.log("\n====================================");
  console.log("📊 Cognitive Load Analysis");
  console.log("====================================");

  console.log("Score :", analysis.score);
  console.log("Status:", analysis.status);

  console.log("\nReasons:");

  if (analysis.reasons.length === 0) {
    console.log("• User seems comfortable.");
  } else {
    analysis.reasons.forEach((reason) =>
      console.log("•", reason)
    );
  }

  console.log("====================================");

  /*
  =====================================
  LOW / MEDIUM
  =====================================
  */

  if (analysis.status !== "HIGH") {
    return {
      analysis,
      adaptiveUI: null,
    };
  }

  /*
  =====================================
  HIGH LOAD
  =====================================
  */

  console.log("\n🚀 High Cognitive Load Detected");
  console.log("Generating Adaptive UI...");

  const form = getFormContext();

  const formDescription = `
Form Name:
${form.formName}

Description:
${form.description}

Fields:

${form.fields.join("\n")}
`;

  const adaptiveUI = await generateAdaptiveUI(
    formDescription,
    analysis
  );

  /*
  =====================================
  Emit to Frontend
  =====================================
  */

  emitAdaptiveUI(adaptiveUI);

  console.log("\n✅ Adaptive UI emitted via WebSocket");

  return {
    analysis,
    adaptiveUI,
  };
}