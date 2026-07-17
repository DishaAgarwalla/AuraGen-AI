import { Request, Response } from "express";
import { processTelemetry } from "../services/telemetryService";

export const receiveTelemetry = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const telemetry = req.body;

    console.log("\n====================================");
    console.log("📡 Telemetry Received");
    console.log("====================================");

    console.table(telemetry);

    const result = await processTelemetry(telemetry);

    res.status(200).json({
      success: true,
      message: "Telemetry processed successfully.",
      cognitiveLoad: result.analysis,
      adaptiveUI: result.adaptiveUI,
    });
  } catch (error) {
    console.error(
      "❌ Telemetry Controller Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to process telemetry.",
    });
  }
};