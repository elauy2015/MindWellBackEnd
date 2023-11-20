import Chat from "./Chat.js";

interface UserInterface {
    name: string;
    email: string;
    image?: string;
    password: string;
    chatsPerDay?: {
      endDay: Date
      numberOfChats: number
    }
    chats: Chat[];
  }

  export default UserInterface