import express from "express";
import cors from "cors";
import "dotenv/config";
import "./db/connection.js";
// Socket
import { createServer } from "node:http";
import { Server } from "socket.io";
// Models
import Message from "./models/messageModel.js";
// Routes
import messageRoutes from "./routes/message.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/message", messageRoutes);

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
    // Create/Save message
    Message.create({
      user: `User${socket.id}`,
      text: data
    })
    .then(savedDoc => {
      // Retrieve messages
      return Message.find({});
    })
    .then(docs => {
      // Emit update
      socket.emit("update", docs);
    })
    .catch(err => console.log(err));
  });

  socket.on("disconnect", () => {
    console.log(`User${socket.id} left`);
  });
});

// start the Express server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});