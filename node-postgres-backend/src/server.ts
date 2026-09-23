// import express from "express";
// import http from "http";
// import { Server } from "socket.io";

// const app = express();
// const PORT = 3000;

// const httpServer = http.createServer(app);
// const io = new Server(httpServer);

// const ROOM = "room-1";

// io.on("connection", (socket) => {
//   console.log("Connected:", socket.id);

//   socket.on("join-room", (data: { name: string }) => {
//     socket.join(ROOM);
//     socket.data.name = data.name;

//     console.log(`${data.name} joined ${ROOM}`);

//     // tell others in the room
//     socket.to(ROOM).emit("chat-message", {
//       from: "server",
//       text: `${data.name} joined the room`,
//     });

//     // confirm to this user
//     socket.emit("chat-message", {
//       from: "server",
//       text: `Welcome ${data.name}! You joined ${ROOM}`,
//     });
//   });

//   // broadcast message to everyone in the room (including sender)
//   socket.on("chat-message", (data: { text: string }) => {
//     const name = socket.data.name || "Unknown";
//     console.log(`[${ROOM}] ${name}: ${data.text}`);

//     io.to(ROOM).emit("chat-message", {
//       from: name,
//       text: data.text,
//     });
//   });

//   socket.on("disconnect", () => {
//     const name = socket.data.name || socket.id;
//     console.log("Disconnected:", name);
//     socket.to(ROOM).emit("chat-message", {
//       from: "server",
//       text: `${name} left the room`,
//     });
//   });
// });

// httpServer.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// ============================================
// Server Setup
import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
