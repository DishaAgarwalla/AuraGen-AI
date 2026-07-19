import { io } from "socket.io-client";

const URL = "http://localhost:3001";

export const socket = io(URL, {

  transports: ["websocket"],

  autoConnect: false,

});

export function connectSocket() {

  if (!socket.connected) {

    socket.connect();

  }

}

export function disconnectSocket() {

  if (socket.connected) {

    socket.disconnect();

  }

}

export function listenAdaptiveUI(
  callback: (data: unknown) => void
) {

  socket.on("adaptive-ui", callback);

}

export function listenCognitiveLoad(
  callback: (data: unknown) => void
) {

  socket.on("cognitive-load", callback);

}

export function listenNotification(
  callback: (data: unknown) => void
) {

  socket.on("notification", callback);

}