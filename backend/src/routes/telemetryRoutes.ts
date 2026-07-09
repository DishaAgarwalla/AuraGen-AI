import express from "express";
import { receiveTelemetry } from "../controllers/telemetryController";

const router = express.Router();

/*
=====================================
POST /api/telemetry
Receives telemetry from frontend
=====================================
*/

router.post("/", receiveTelemetry);

export default router;