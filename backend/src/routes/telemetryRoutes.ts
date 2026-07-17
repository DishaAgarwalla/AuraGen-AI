import express from "express";
import { receiveTelemetry } from "../controllers/telemetryController";

const router = express.Router();

/*
=========================================
POST /api/telemetry
=========================================
*/

router.post("/", receiveTelemetry);

export default router;