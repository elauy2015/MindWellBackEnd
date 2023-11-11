import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, getUserChats } from "../controllers/chats-controllers.js";
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoutes.get("/all-chats", verifyToken, getUserChats);
chatRoutes.delete("/delete-chats", verifyToken, deleteChats);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map