export interface CognitiveLoad {
  score: number;
  status: "LOW" | "MEDIUM" | "HIGH";
  reasons: string[];
}

export interface AdaptiveUI {
  simplifiedUI: string;
  generatedCode: string;
  cognitiveScore: number;
  status: "LOW" | "MEDIUM" | "HIGH";
}

export interface TelemetryResponse {
  success: boolean;
  message: string;
  cognitiveLoad: CognitiveLoad;
  adaptiveUI: AdaptiveUI | null;
}