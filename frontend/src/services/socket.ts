import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export const socket: Socket = io(URL, {
  transports: ["websocket"],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Connection state management
let isConnecting = false;

export function connectSocket() {
  if (isConnecting) return;
  
  if (!socket.connected) {
    isConnecting = true;
    
    if (process.env.NODE_ENV === "development") {
      console.log("🔌 Connecting to Socket.IO...");
    }
    
    socket.connect();
    
    socket.once("connect", () => {
      isConnecting = false;
      if (process.env.NODE_ENV === "development") {
        console.log("✅ Socket.IO connected successfully");
        console.log(`📡 Socket ID: ${socket.id}`);
      }
    });
  }
}

export function disconnectSocket() {
  if (socket.connected) {
    if (process.env.NODE_ENV === "development") {
      console.log("🔌 Disconnecting Socket.IO...");
    }
    
    socket.disconnect();
    isConnecting = false;
    
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Socket.IO disconnected");
    }
  }
}

// Event listeners with better logging
export function listenAdaptiveUI(callback: (data: unknown) => void) {
  socket.on("adaptive-ui", (data) => {
    if (process.env.NODE_ENV === "development") {
      console.log("🎨 Adaptive UI event received");
    }
    callback(data);
  });
}

export function listenCognitiveLoad(callback: (data: unknown) => void) {
  socket.on("cognitive-load", (data) => {
    if (process.env.NODE_ENV === "development") {
      console.log("🧠 Cognitive load event received");
    }
    callback(data);
  });
}

export function listenNotification(callback: (data: unknown) => void) {
  socket.on("notification", (data) => {
    if (process.env.NODE_ENV === "development") {
      console.log("🔔 Notification event received");
    }
    callback(data);
  });
}

// Error handling
socket.on("connect_error", (error) => {
  console.error("❌ Socket.IO connection error:", error.message);
  isConnecting = false;
});

socket.on("reconnect", (attemptNumber) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`🔄 Socket.IO reconnected after ${attemptNumber} attempts`);
  }
});

socket.on("reconnect_failed", () => {
  console.error("❌ Socket.IO reconnection failed");
  isConnecting = false;
});