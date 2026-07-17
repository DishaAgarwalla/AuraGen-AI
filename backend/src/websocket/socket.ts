import { Server } from "socket.io";
import { Server as HTTPServer } from "http";

let io: Server;

export function initializeSocket(
  server: HTTPServer
) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {

    console.log("\n====================================");
    console.log("🟢 Frontend Connected");
    console.log(`Socket ID: ${socket.id}`);
    console.log("====================================");

    socket.on("disconnect", () => {

      console.log("\n====================================");
      console.log("🔴 Frontend Disconnected");
      console.log(`Socket ID: ${socket.id}`);
      console.log("====================================");

    });

  });

  console.log("====================================");
  console.log("✅ WebSocket Server Started");
  console.log("====================================");
}

export function emitAdaptiveUI(data: unknown) {

  if (!io) {
    console.warn("⚠ Socket.IO not initialized.");
    return;
  }

  console.log("\n====================================");
  console.log("📤 Sending Adaptive UI");
  console.log("====================================");

  io.emit("adaptive-ui", data);
}

export function emitCognitiveLoad(data: unknown) {

  if (!io) return;

  io.emit("cognitive-load", data);
}

export function emitNotification(
  message: string
) {

  if (!io) return;

  io.emit("notification", {
    message,
  });
}