const API_URL = "http://localhost:3001";

// ===============================
// Types
// ===============================

export interface FinancialFormData {
  fullName: string;
  email: string;
  phone: string;
  dob: string;

  occupation: string;
  income: string;
  employment: string;
  goal: string;

  pan: string;
  account: string;
  ifsc: string;
  aadhaar: string;

  agree: boolean;
}

export interface TelemetryData {
  mouseMoves: number;
  clicks: number;
  rageClicks: number;

  keyPresses: number;
  backspaces: number;

  mouseX: number;
  mouseY: number;

  mouseSpeed: number;

  idleTime: number;

  formDuration: number;
}

// ===============================
// Submit Financial Form
// ===============================

export async function submitFinancialForm(
  data: FinancialFormData
) {
  try {
    const response = await fetch(`${API_URL}/api/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit financial form.");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Form Submission Error:", error);
    throw error;
  }
}

// ===============================
// Send Telemetry
// ===============================

export async function sendTelemetry(
  data: TelemetryData
) {
  try {
    const response = await fetch(`${API_URL}/api/telemetry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to send telemetry.");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Telemetry Error:", error);
  }
}

// ===============================
// Health Check
// (Useful while developing)
// ===============================

export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);

    return await response.json();
  } catch (error) {
    console.error("Backend Offline:", error);
  }
}