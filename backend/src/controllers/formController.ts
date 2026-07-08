import { Request, Response } from "express";

export const submitForm = (req: Request, res: Response) => {
  const formData = req.body;

  console.log("📩 Form Received:");
  console.log(formData);

  res.status(200).json({
    success: true,
    message: "Form submitted successfully!",
    data: formData,
  });
};