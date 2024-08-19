import express from "express";
import cors from "cors";
// Socket
import { createServer } from "node:http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Initialize server after middleware applied
const server = createServer(app);
const io = new Server(server, {
  // Allow connection from client
  cors: { origin: '*' }
});

io.on("connect", socket => {
  console.log(`User${socket.id} joined`);

  socket.on("message", data => {
    console.log(`User${socket.id}: ${data}`);
  });

  socket.on("disconnect", () => {
    console.log(`User${socket.id} left`);
  });
});

// start the Express server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});