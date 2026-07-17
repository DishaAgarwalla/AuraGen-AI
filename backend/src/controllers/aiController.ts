import { Request, Response } from "express";

import { generateAIResponse } from "../services/aiService";

export const generateResponse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({
        success: false,
        message: "Prompt is required.",
      });

      return;
    }

    console.log("\n====================================");
    console.log("📨 AI Request Received");
    console.log("====================================");

    console.log(prompt);

    const response =
      await generateAIResponse(prompt);

    console.log("\n====================================");
    console.log("🤖 AI Response");
    console.log("====================================");

    console.log(response);

    res.status(200).json({
      success: true,
      prompt,
      response,
    });
  } catch (error) {
    console.error(
      "❌ AI Controller Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response.",
    });
  }
};