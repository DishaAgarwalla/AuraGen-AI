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

    console.log("🔌 Connecting to Socket.IO...");

    listenAdaptiveUI((data) => {
      console.log("📤 Adaptive UI Received");
      console.log(data);
    });

    listenCognitiveLoad((data) => {
      console.log("🧠 Cognitive Load");
      console.log(data);
    });

    listenNotification((data) => {
      console.log("🔔 Notification");
      console.log(data);
    });

    return () => {
      disconnectSocket();
    };
  }, []);
}