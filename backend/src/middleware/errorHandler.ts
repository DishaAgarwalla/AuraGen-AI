import {
  Request,
  Response,
  NextFunction,
} from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("\n====================================");
  console.error("❌ Global Error Handler");
  console.error("====================================");

  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : undefined,
  });
}