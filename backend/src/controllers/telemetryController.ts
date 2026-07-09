import { Request, Response } from "express";
import { processTelemetry } from "../services/telemetryService";

export const receiveTelemetry = (
  req: Request,
  res: Response
) => {
  try {
    const telemetry = req.body;

    console.log("\n====================================");
    console.log("📡 Telemetry Received");
    console.log("====================================");
    console.table(telemetry);

    const result = processTelemetry(telemetry);

    console.log("\n🧠 Cognitive Load Analysis");
    console.table(result);

    res.status(200).json({
      success: true,
      message: "Telemetry processed successfully",
      cognitiveLoad: result,
    });
  } catch (error) {
    console.error("❌ Telemetry Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to process telemetry",
    });
  }
};