import { useEffect } from "react";
import {
  connectSocket,
  disconnectSocket,
  listenAdaptiveUI,
  listenCognitiveLoad,
  listenNotification,
} from "../services/socket";

export function useSocket() {
  useEffect(() => {
    connectSocket();
    console.log("🔌 Socket.IO connected");

    listenAdaptiveUI((data) => {
      console.log("📤 Adaptive UI Received:", data);
    });

    listenCognitiveLoad((data) => {
      console.log("🧠 Cognitive Load:", data);
    });

    listenNotification((data) => {
      console.log("🔔 Notification:", data);
    });

    return () => {
      disconnectSocket();
      console.log("🔌 Socket.IO disconnected");
    };
  }, []);
}