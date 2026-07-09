import { TelemetryData } from "../types/telemetry";
import { calculateCognitiveLoad } from "../utils/cognitiveLoad";

export function processTelemetry(
  telemetry: TelemetryData
) {

  const result = calculateCognitiveLoad(telemetry);

  console.log("\n==============================");
  console.log("📊 Cognitive Load Analysis");
  console.log("==============================");

  console.log("Score :", result.score);
  console.log("Status:", result.status);

  console.log("\nReasons:");

  if (result.reasons.length === 0) {
    console.log("• User seems comfortable.");
  } else {
    result.reasons.forEach((reason) => {
      console.log("•", reason);
    });
  }

  console.log("==============================\n");

  return result;
}