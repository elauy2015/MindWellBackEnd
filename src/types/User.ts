import Chat from "./Chat.js";

interface UserInterface {
    name: string;
    email: string;
    image?: string;
    password: string;
    chats: Chat[];
  }

  export default UserInterface