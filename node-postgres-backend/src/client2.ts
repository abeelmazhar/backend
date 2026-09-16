import { io } from "socket.io-client";

const NAME = "User2";
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log(`[${NAME}] Connected:`, socket.id);

  socket.emit("join-room", { name: NAME });

  setTimeout(() => {
    socket.emit("chat-message", { text: `Hi, this is ${NAME}` });
  }, 1000);
});

socket.on("chat-message", (data: { from: string; text: string }) => {
  console.log(`[${NAME} sees] ${data.from}: ${data.text}`);
});

socket.on("disconnect", () => {
  console.log(`[${NAME}] Disconnected`);
});
