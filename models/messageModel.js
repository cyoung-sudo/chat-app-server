import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const messageSchema = mongoose.model("Message", MessageSchema);

export default messageSchema;