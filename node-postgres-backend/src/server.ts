import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 3000;

const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.get("/", (_req, res) => {
  res.json({ message: "Chat server running" });
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.emit("chat-reply", {
    from: "server",
    text: "Welcome! Send a message.",
  });

  // client sends a message → server replies
  socket.emit("chat-message", {
    from: "server",
    text: "Welcome! i am a big server",
  });
  socket.on("chat-message", (data: { text: string }) => {
    console.log(`From ${socket.id}:`, data.text);

    socket.emit("chat-reply", {
      from: "server",
      text: `You said: "${data.text}"`,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
