import { Request, Response } from "express";
import { getCurrentForm } from "../services/formService";

export const getForm = (
  req: Request,
  res: Response
): void => {
  try {
    console.log("====================================");
    console.log("📄 Form Requested");
    console.log("====================================");

    const form = getCurrentForm();

    res.status(200).json({
      success: true,
      form,
    });
  } catch (error) {
    console.error("❌ Form Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load form.",
    });
  }
};