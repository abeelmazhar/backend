import { io } from "socket.io-client";

const NAME = "User3";
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log(`[${NAME}] Connected:`, socket.id);

  socket.emit("join-room", { name: NAME });

  setTimeout(() => {
    socket.emit("chat-message", { text: `Hey room, ${NAME} here` });
  }, 1500);
});

socket.on("chat-message", (data: { from: string; text: string }) => {
  console.log(`[${NAME} sees] ${data.from}: ${data.text}`);
});

socket.on("disconnect", () => {
  console.log(`[${NAME}] Disconnected`);
});
