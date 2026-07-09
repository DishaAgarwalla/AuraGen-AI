import express from "express";
import cors from "cors";

import formRoutes from "./routes/formRoutes";
import telemetryRoutes from "./routes/telemetryRoutes";

const app = express();
const PORT = 3001;

/*
=====================================
Middlewares
=====================================
*/

app.use(cors());

app.use(express.json());

/*
=====================================
Health Routes
=====================================
*/

app.get("/", (_, res) => {
  res.send("🚀 AuraGen Backend Running");
});

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Backend Healthy",
  });
});

/*
=====================================
API Routes
=====================================
*/

app.use("/api/form", formRoutes);

app.use("/api/telemetry", telemetryRoutes);

/*
=====================================
Server
=====================================
*/

app.listen(PORT, () => {
  console.log("====================================");
  console.log("🚀 AuraGen Backend Started");
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("====================================");
});