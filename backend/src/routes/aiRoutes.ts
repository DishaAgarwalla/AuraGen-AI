import express from "express";

import { generateResponse } from "../controllers/aiController";

const router = express.Router();

/*
====================================
POST /api/ai/generate
====================================
*/

router.post(
  "/generate",
  generateResponse
);

export default router;