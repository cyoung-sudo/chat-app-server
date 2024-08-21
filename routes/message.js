import express from "express";
// Models
import Message from "../models/messageModel.js";

const messageRoutes = express.Router();

messageRoutes.route("/")
//----- Retrieve all messages 
.get((req, res) => {
  Message.find({})
  .then(allDocs => {
    res.json({
      success: true,
      messages: allDocs
    });
  })
  .catch(err => {
    console.log(err)
    res.json({ success: false });
  });
});

export default messageRoutes;