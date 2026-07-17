import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";

import formRoutes from "./routes/formRoutes";
import telemetryRoutes from "./routes/telemetryRoutes";
import aiRoutes from "./routes/aiRoutes";

import { errorHandler } from "./middleware/errorHandler";
import { initializeSocket } from "./websocket/socket";

const app = express();
const PORT = process.env.PORT || 3001;

/*
=====================================
Middlewares
=====================================
*/

app.use(cors());

app.use(
  express.json({
    limit: "2mb",
  })
);

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
app.use("/api/ai", aiRoutes);

/*
=====================================
Global Error Handler
=====================================
*/

app.use(errorHandler);

/*
=====================================
HTTP Server + WebSocket
=====================================
*/

const server = http.createServer(app);

initializeSocket(server);

/*
=====================================
Server
=====================================
*/

server.listen(PORT, () => {
  console.log("====================================");
  console.log("🚀 AuraGen Backend Started");
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("🔌 Socket.IO Enabled");
  console.log("====================================");
});