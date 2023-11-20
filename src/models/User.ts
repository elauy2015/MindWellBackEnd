import mongoose from "mongoose";
import { randomUUID } from "crypto";
import ChatInterface from "../types/Chat.js";
import UserInterface from "../types/User.js";

const chatSchema = new mongoose.Schema<ChatInterface>({
  id: {
    type: String,
    default: randomUUID(),
  },
  role: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
});
const userSchema = new mongoose.Schema<UserInterface>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  chatsPerDay: {
    type: Object,
  },
  chats: [chatSchema],
  
});

export default mongoose.model("User", userSchema);
