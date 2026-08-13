import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const base = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace("/api", "");
    socket = io(base, {
      withCredentials: true,
      autoConnect: false,
    });
  }
  return socket;
}