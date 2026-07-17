export interface UIGenerationRequest {
  prompt: string;

  cognitiveScore: number;

  status: "LOW" | "MEDIUM" | "HIGH";

  reasons: string[];
}

export interface UIGenerationResponse {
  simplifiedUI: string;

  generatedCode: string;

  cognitiveScore: number;

  status: "LOW" | "MEDIUM" | "HIGH";
}