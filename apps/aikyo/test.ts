import * as readline from "readline";
import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });
const clients = new Set<WebSocket>();

wss.on("connection", (ws) => {
  console.log("New client connected");
  clients.add(ws);

  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  console.log(`Broadcasting to ${clients.size} clients: ${line}`);
  const a = {
    text: "喋らせたいテキスト",
    role: "assistant",
    emotion: "neutral",
    type: "message",
  };
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(a));
    }
  });
});

console.log("WebSocket server started on ws://localhost:8000");
