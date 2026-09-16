import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  // first message
  socket.emit("chat-message", { text: "Hello server!" });

  // second message (after 1 second so you can see both clearly)

  socket.emit("chat-message", { text: "how are you server" });
  socket.on("chat-message", (data: { text: string }) => {
    console.log(`[${data.text}]`);
  });
});

socket.on("chat-reply", (data: { from: string; text: string }) => {
  console.log(`[${data.from}] ${data.text}`);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});
