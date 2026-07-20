import { TelemetryData } from "../types/telemetry";
import { TelemetryResponse } from "../types/adaptiveUI";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Helper for logging API calls
const logApiCall = (endpoint: string, method: string, data?: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`🌐 API ${method} ${endpoint}`, data || "");
  }
};

// Helper for handling API errors
const handleApiError = async (response: Response, endpoint: string) => {
  let errorMessage = `Failed to ${endpoint}`;
  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorMessage;
  } catch {
    // If response isn't JSON, use status text
    errorMessage = response.statusText || errorMessage;
  }
  throw new Error(errorMessage);
};

export async function sendTelemetry(
  telemetry: TelemetryData
): Promise<TelemetryResponse> {
  logApiCall("/telemetry", "POST", telemetry);

  const response = await fetch(`${BASE_URL}/telemetry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(telemetry),
  });

  if (!response.ok) {
    await handleApiError(response, "send telemetry");
  }

  const data = await response.json();
  
  if (process.env.NODE_ENV === "development") {
    console.log("✅ Telemetry sent successfully");
  }

  return data;
}

export async function generateAIResponse(prompt: string) {
  logApiCall("/ai/generate", "POST", { prompt });

  const response = await fetch(`${BASE_URL}/ai/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  if (!response.ok) {
    await handleApiError(response, "generate AI response");
  }

  const data = await response.json();

  if (process.env.NODE_ENV === "development") {
    console.log("✅ AI response generated");
  }

  return data;
}

export async function getForm() {
  logApiCall("/form", "GET");

  const response = await fetch(`${BASE_URL}/form`);

  if (!response.ok) {
    await handleApiError(response, "fetch form");
  }

  const data = await response.json();

  if (process.env.NODE_ENV === "development") {
    console.log("✅ Form fetched successfully");
  }

  return data;
}

export async function submitFinancialForm(data: any) {
  logApiCall("/form", "POST", data);

  const response = await fetch(`${BASE_URL}/form`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    await handleApiError(response, "submit form");
  }

  const result = await response.json();

  if (process.env.NODE_ENV === "development") {
    console.log("✅ Form submitted successfully");
  }

  return result;
}