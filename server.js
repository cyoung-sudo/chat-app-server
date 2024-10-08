import express from "express";
import cors from "cors";
import "dotenv/config";
import "./db/connection.js";
// Socket
import { createServer } from "node:http";
import { Server } from "socket.io";
// Models
import Message from "./models/messageModel.js";

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
  //----- Send messages on initial connection
  // Delete all messages in max reached
  Message.find({})
    .then(docs => {
      socket.emit("update", docs);
    })
    .catch(err => console.log(err));

  //----- Handle new messages
  socket.on("message", data => {
    // Create/Save message
    Message.create({
      user: `User(${socket.id})`,
      text: data
    })
    .then(savedDoc => {
      // Retrieve all messages
      return Message.find({});
    })
    .then(docs => {
      // Emit messages to all
      io.sockets.emit("update", docs)
    })
    .catch(err => console.log(err));
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});