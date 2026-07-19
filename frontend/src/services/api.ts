import { TelemetryData } from "../types/telemetry";
import { TelemetryResponse } from "../types/adaptiveUI";

const BASE_URL = "http://localhost:3001/api";

export async function sendTelemetry(
  telemetry: TelemetryData
): Promise<TelemetryResponse> {

  const response = await fetch(
    `${BASE_URL}/telemetry`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(telemetry),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send telemetry.");
  }

  return response.json();
}

export async function generateAIResponse(
  prompt: string
) {

  const response = await fetch(
    `${BASE_URL}/ai/generate`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        prompt,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate AI response.");
  }

  return response.json();
}

export async function getForm() {

  const response = await fetch(
    `${BASE_URL}/form`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch form.");
  }

  return response.json();
}
export async function submitFinancialForm(data: any) {
  const response = await fetch(
    `${BASE_URL}/form`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to submit form.");
  }

  return response.json();
}