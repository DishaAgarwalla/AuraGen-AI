import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export const socket: Socket = io(URL, {
  transports: ["websocket"],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

let isConnecting = false;

export function connectSocket() {
  if (isConnecting) return;
  
  if (!socket.connected) {
    isConnecting = true;
    socket.connect();
    socket.once("connect", () => {
      isConnecting = false;
      console.log("✅ Socket.IO connected");
    });
  }
}

export function disconnectSocket() {
  if (socket.connected) {
    socket.disconnect();
    isConnecting = false;
    console.log("🔌 Socket.IO disconnected");
  }
}

export function listenAdaptiveUI(callback: (data: unknown) => void) {
  socket.on("adaptive-ui", callback);
}

export function listenCognitiveLoad(callback: (data: unknown) => void) {
  socket.on("cognitive-load", callback);
}

export function listenNotification(callback: (data: unknown) => void) {
  socket.on("notification", callback);
}

// Error handling
socket.on("connect_error", (error) => {
  console.error("❌ Socket.IO connection error:", error.message);
  isConnecting = false;
});

socket.on("reconnect", (attemptNumber) => {
  console.log(`🔄 Socket.IO reconnected after ${attemptNumber} attempts`);
});

socket.on("reconnect_failed", () => {
  console.error("❌ Socket.IO reconnection failed");
  isConnecting = false;
});