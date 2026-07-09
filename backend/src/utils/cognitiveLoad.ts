import { TelemetryData } from "../types/telemetry";

export interface CognitiveLoadResult {
  score: number;
  status: "LOW" | "MEDIUM" | "HIGH";
  reasons: string[];
}

export function calculateCognitiveLoad(
  data: TelemetryData
): CognitiveLoadResult {

  let score = 0;

  const reasons: string[] = [];

  //-------------------------------------------------
  // Mouse Movement
  //-------------------------------------------------

  if (data.mouseMoves > 600) {
    score += 20;
    reasons.push("Excessive mouse movement");
  }
  else if (data.mouseMoves > 300) {
    score += 10;
    reasons.push("High mouse movement");
  }

  //-------------------------------------------------
  // Mouse Speed
  //-------------------------------------------------

  if (data.mouseSpeed > 1.2) {
    score += 10;
    reasons.push("Fast mouse movement");
  }

  //-------------------------------------------------
  // Clicks
  //-------------------------------------------------

  if (data.clicks > 25) {
    score += 10;
    reasons.push("Too many clicks");
  }

  //-------------------------------------------------
  // Rage Clicks
  //-------------------------------------------------

  if (data.rageClicks >= 5) {
    score += 25;
    reasons.push("Repeated rage clicks");
  }

  //-------------------------------------------------
  // Keyboard Usage
  //-------------------------------------------------

  if (data.keyPresses > 120) {
    score += 10;
    reasons.push("Too many key presses");
  }

  //-------------------------------------------------
  // Corrections
  //-------------------------------------------------

  if (data.backspaces > 10) {
    score += 15;
    reasons.push("Frequent corrections");
  }

  //-------------------------------------------------
  // Idle Time
  //-------------------------------------------------

  if (data.idleTime > 10) {
    score += 15;
    reasons.push("Long hesitation");
  }

  //-------------------------------------------------
  // Field Completion Time
  //-------------------------------------------------

  if (data.averageFieldTime > 12) {
    score += 20;
    reasons.push("Taking too long on fields");
  }

  //-------------------------------------------------
  // Overall Form Duration
  //-------------------------------------------------

  if (data.formDuration > 180) {
    score += 15;
    reasons.push("Form taking unusually long");
  }

  //-------------------------------------------------
  // Limit Score
  //-------------------------------------------------

  if (score > 100) score = 100;

  //-------------------------------------------------
  // Status
  //-------------------------------------------------

  let status: "LOW" | "MEDIUM" | "HIGH" = "LOW";

  if (score >= 70) {
    status = "HIGH";
  }
  else if (score >= 40) {
    status = "MEDIUM";
  }

  return {
    score,
    status,
    reasons,
  };
}